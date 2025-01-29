package net.dutymate.api.member.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.dutymate.api.annotation.Auth;
import net.dutymate.api.entity.Member;
import net.dutymate.api.member.dto.LoginResponseDto;
import net.dutymate.api.member.service.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

	private final MemberService memberService;

	@GetMapping("/login/kakao")
	public ResponseEntity<?> kakaoLogin(@RequestParam String code) {
		LoginResponseDto loginResponseDto = memberService.kakaoLogin(code);
		return ResponseEntity.ok(loginResponseDto);
	}
}
