package net.dutymate.api.wardmember.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import net.dutymate.api.entity.Member;
import net.dutymate.api.entity.Ward;
import net.dutymate.api.entity.WardMember;
import net.dutymate.api.member.repository.MemberRepository;
import net.dutymate.api.wardmember.dto.NurseInfoRequestDto;
import net.dutymate.api.wardmember.repository.WardMemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WardMemberService {

	private final WardMemberRepository wardMemberRepository;
	private final MemberRepository memberRepository;

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

		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "유효하지 않은 회원입니다."));

		// TODO member가 병동 회원인지 체크하는 로직

		WardMember wardMemeber = member.getWardMember();
		Ward ward = wardMemeber.getWard();

		ward.removeWardMember(wardMemeber); // 리스트에서 제거(연관관계 제거)
	}
}
