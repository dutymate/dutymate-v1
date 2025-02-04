package net.dutymate.api.ward.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import net.dutymate.api.entity.Member;
import net.dutymate.api.entity.Ward;
import net.dutymate.api.entity.WardMember;
import net.dutymate.api.ward.dto.RequestWardDto;
import net.dutymate.api.ward.dto.WardInfoResponseDto;
import net.dutymate.api.ward.repository.WardRepository;
import net.dutymate.api.wardmember.repository.WardMemberRepository;
import net.dutymate.api.wardschedules.collections.WardSchedule;
import net.dutymate.api.wardschedules.repository.WardScheduleRepository;
import net.dutymate.api.wardschedules.util.InitialDutyGenerator;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WardService {

	private final WardRepository wardRepository;
	private final WardMemberRepository wardMemberRepository;
	private final WardScheduleRepository wardScheduleRepository;
	private final InitialDutyGenerator initialDutyGenerator;

	@Transactional
	public void createWard(RequestWardDto requestWardDto, Member member) {
		// 1. 로그인한 member가 이미 병동을 생성했다면, 400(BAD_REQUEST)
		boolean exists = wardMemberRepository.existsByMember(member);

		if (exists) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "이미 병동이 있습니다.");
		}

		// 2. Ward  생성 -> Rule 자동 생성
		Ward ward = requestWardDto.toWard(generateWardCode());
		wardRepository.save(ward);

		// 3. WardMember 생성 (로그인한 사용자 추가)
		WardMember wardMember = WardMember.builder()
			.isSynced(true)
			.ward(ward)
			.member(member)
			.build();
		wardMemberRepository.save(wardMember);

		// ward의 List에 wardMember 추가
		ward.addWardMember(wardMember);

		// 4. 현재 날짜 기준으로  year, month 생성
		LocalDate currentDate = LocalDate.now();
		int year = currentDate.getYear();
		int month = currentDate.getMonthValue();

		// 5. 병동 생성하는 멤버의 듀티표 초기화하여 mongodb에 저장하기
		initialDutyGenerator.initalizeDuty(wardMember, year, month);
	}

	@Transactional
	public void checkInvalidCode(String wardCode, Member member) {
		// 1. wardCode에 해당하는 ward가 존재하는지 확인
		Ward ward = wardRepository.findByWardCode(wardCode)
			.orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "유효하지 않은 병동 코드입니다."));

		// 2. 이미 ward에 입장한 회원인지 확인
		boolean isAlreadyEnteredWard = wardMemberRepository.existsByMember(member);
		if (isAlreadyEnteredWard) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "이미 입장한 병동이 있습니다.");
		}

		// 3. 유효한 코드라면, 병동 회원으로 추가하기
		WardMember newWardMember = WardMember.builder()
			.isSynced(true)
			.ward(ward)
			.member(member)
			.build();

		wardMemberRepository.save(newWardMember);

		ward.addWardMember(newWardMember);

		// 4. 병동 Id로 MongoDB에 추가된 현재달과 다음달 듀티 확인
		// 4-1. 이번달 듀티
		LocalDate currentDate = LocalDate.now();
		int year = currentDate.getYear();
		int month = currentDate.getMonthValue();

		WardSchedule currMonthSchedule = wardScheduleRepository.findByWardIdAndYearAndMonth(
			ward.getWardId(), year, month).orElse(null);

		// 4-2. 다음달 듀티
		int nextMonth = (month == 12) ? 1 : month + 1;
		int nextYear = (month == 12) ? year + 1 : year;

		WardSchedule nextMonthSchedule = wardScheduleRepository.findByWardIdAndYearAndMonth(
			ward.getWardId(), nextYear, nextMonth).orElse(null);

		// 5. 기존 스케줄이 존재한다면, 새로운 스냅샷 생성 및 초기화된 duty 추가하기
		if (currMonthSchedule != null) {
			initialDutyGenerator.updateDutyWithNewMember(currMonthSchedule, newWardMember);
		}

		if (nextMonthSchedule != null) {
			initialDutyGenerator.updateDutyWithNewMember(nextMonthSchedule, newWardMember);
		}

		// 6. 기존 스케줄이 없다면, 입장한 멤버의 듀티표 초기화하여 저장하기
		// 사실 이미 병동이 생성된 이상, 무조건 기존 스케줄이 있어야만 함
		if (currMonthSchedule == null && nextMonthSchedule == null) {
			initialDutyGenerator.initalizeDuty(newWardMember, year, month);
		}
	}

	@Transactional
	public WardInfoResponseDto getWardInfo(Member member) {
		// 1. 현재 member(관리자)의 wardmemberId 조회
		WardMember wardMember = wardMemberRepository.findByMember(member);

		if (wardMember == null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "해당 멤버가 속한 병동을 찾을 수 없습니다.");
		}

		// 2. 관리자가 속한 병동 조회
		Ward ward = wardMember.getWard();

		// 3. 해당 병동의 모든 wardMember 조회
		List<WardMember> wardMemberList = wardMemberRepository.findAllByWard(ward);

		return WardInfoResponseDto.of(ward, wardMemberList);
	}

	// wardCode : 랜덤한 6자리 대문자 + 숫자 조합 코드 생성
	private String generateWardCode() {
		Random random = new Random();
		StringBuilder code = new StringBuilder();
		String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		for (int i = 0; i < 6; i++) {
			code.append(characters.charAt(random.nextInt(characters.length())));
		}
		return code.toString();
	}
}
