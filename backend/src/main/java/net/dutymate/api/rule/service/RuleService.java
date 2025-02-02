package net.dutymate.api.rule.service;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import net.dutymate.api.entity.Member;
import net.dutymate.api.entity.WardMember;
import net.dutymate.api.rule.dto.RuleResponseDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RuleService {

	@Transactional
	public RuleResponseDto getRule(Member member) {

		WardMember wardMember = Optional.ofNullable(member)
			.map(Member::getWardMember)
			.orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "병동에 속하지 않은 회원입니다."));

		return RuleResponseDto.of(wardMember.getWard().getRule());
	}
}
