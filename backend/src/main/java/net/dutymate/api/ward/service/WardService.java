package net.dutymate.api.ward.service;

import org.springframework.stereotype.Service;

import net.dutymate.api.entity.Member;
import net.dutymate.api.entity.Ward;
import net.dutymate.api.entity.WardMember;
import net.dutymate.api.ward.dto.RequestWardDto;
import net.dutymate.api.ward.repository.WardRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WardService {

	private final WardRepository wardRepository;

	@Transactional
	public Ward createWard(RequestWardDto requestWardDto, Member member) {
		Ward ward = requestWardDto.toWard();

		WardMember wardMember = WardMember.builder().build();
		wardMember.assignMember(ward, member);

		// ward의 List에 wardMember 추가
		ward.addWardMember(wardMember);

		return wardRepository.save(ward);
	}
}
