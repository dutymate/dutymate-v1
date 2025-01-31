package net.dutymate.api.ward.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import net.dutymate.api.entity.Member;
import net.dutymate.api.entity.Ward;
import net.dutymate.api.entity.WardMember;
import net.dutymate.api.ward.dto.RequestWardDto;
import net.dutymate.api.ward.repository.WardRepository;
import net.dutymate.api.wardmember.repository.WardMemberRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WardService {

	private final WardRepository wardRepository;
	private final WardMemberRepository wardMemberRepository;

	@Transactional
	public void createWard(RequestWardDto requestWardDto, Member member) {
		// 1. 로그인한 member가 이미 병동을 생성했다면, 400(BAD_REQUEST)
		boolean exists = wardMemberRepository.existsByMember(member);

		if (exists) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "이미 병동이 있습니다.");
		}

		// 2. Ward  생성 -> Rule 자동 생성
		Ward ward = requestWardDto.toWard();
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
	}

	@Transactional
	public void checkInvalidCode(String wardCode, Member member) {
		// 1. wardCode에 해당하는 ward가 존재하는지 확인
		Ward ward = wardRepository.findByWardCode(wardCode)
			.orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "유효하지 않은 병동 코드입니다."));

		// 2. 이미 ward에 입장한 회원인지 확인
		boolean isAlreadyEnteredWard = wardMemberRepository.existsByWardAndMember(ward, member);
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
	}
}
