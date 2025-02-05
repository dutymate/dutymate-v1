package net.dutymate.api.wardmember.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.dutymate.api.entity.Member;
import net.dutymate.api.wardmember.repository.WardMemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WardMemberService {

	private final WardMemberRepository wardMemberRepository;

	@Transactional
	public void updateWardMember(Long memberId, Member member) {
		// memberId로 wardMember 찾기
		// WardMember wardMember = wardMemberRepository.findByWardMemberId
	}
}
