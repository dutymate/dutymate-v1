package net.dutymate.api.wardmember.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import net.dutymate.api.entity.Member;
import net.dutymate.api.entity.Ward;
import net.dutymate.api.entity.WardMember;
import net.dutymate.api.member.repository.MemberRepository;
import net.dutymate.api.records.YearMonth;
import net.dutymate.api.wardmember.dto.NurseInfoRequestDto;
import net.dutymate.api.wardschedules.collections.WardSchedule;
import net.dutymate.api.wardschedules.repository.WardScheduleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WardMemberService {

	private final MemberRepository memberRepository;
	private final WardScheduleRepository wardScheduleRepository;

	@Transactional
	public void updateWardMember(Long memberId, NurseInfoRequestDto nurseInfoRequestDto) {

		// memberId로 Member 찾기
		Member member = memberRepository.findById(memberId).orElseThrow(() -> new ResponseStatusException(
			HttpStatus.BAD_REQUEST, "유효한 회원이 아닙니다."));

		// TODO 수정하려는 멤버가 관리자가 속한 병동의 병동 멤버인지 아닌지 check하는 로직
		// member가 속해있는 병동에 속한 memberId가 맞는지 확인

		// 멤버와 1:1 매핑 되어 있는 wardMember 정보 수정
		member.getWardMember().updateWardMemberInfo(
			nurseInfoRequestDto.getShift(),
			nurseInfoRequestDto.getSkillLevel(),
			nurseInfoRequestDto.getMemo(),
			nurseInfoRequestDto.getRole()
		);
	}

	@Transactional
	public void deleteWardMember(Long memberId) {

		// 내보내려는 멤버 찾기
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "유효하지 않은 회원입니다."));

		// TODO member가 병동 회원인지 체크하는 로직

		WardMember wardMemeber = member.getWardMember();
		Ward ward = wardMemeber.getWard();

		// RDB에서 wardMember 삭제하기
		ward.removeWardMember(wardMemeber); // 리스트에서 제거(연관관계 제거)

		// MongoDB 에서 내보내는 wardmember 찾아서 삭제 (이전 달은 상관 X)
		// 이번달 듀티에서 삭제
		YearMonth yearMonth = YearMonth.nowYearMonth();

		WardSchedule currMonthSchedule = wardScheduleRepository.findByWardIdAndYearAndMonth(ward.getWardId(),
			yearMonth.year(), yearMonth.month()).orElse(null);

		if (currMonthSchedule != null) {
			deleteWardMemberDuty(currMonthSchedule, member);
		}

		// 다음달 듀티에서 삭제
		YearMonth nextYearMonth = yearMonth.nextYearMonth();
		WardSchedule nextMonthSchedule = wardScheduleRepository.findByWardIdAndYearAndMonth(ward.getWardId(),
			nextYearMonth.year(), nextYearMonth.month()).orElse(null);

		if (nextMonthSchedule != null) {
			deleteWardMemberDuty(nextMonthSchedule, member);
		}
	}

	private void deleteWardMemberDuty(WardSchedule existingSchedule, Member member) {

		WardSchedule.Duty lastDuty = existingSchedule.getDuties().getLast();

		lastDuty.getDuty().removeIf(nurseShift -> nurseShift.getMemberId().equals(member.getMemberId()));

		WardSchedule deletedSchedule = WardSchedule.builder()
			.id(existingSchedule.getId())
			.wardId(existingSchedule.getWardId())
			.year(existingSchedule.getYear())
			.month(existingSchedule.getMonth())
			.duties(new ArrayList<>(List.of(lastDuty))) // 기존 duties 초기화 시키고, 나간 멤버가 삭제된 duty 하나만 남기기
			.build();

		wardScheduleRepository.save(deletedSchedule);
	}
}
