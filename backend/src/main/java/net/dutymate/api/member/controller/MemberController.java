package net.dutymate.api.member.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.dutymate.api.annotation.Auth;
import net.dutymate.api.entity.Member;
import net.dutymate.api.member.dto.AdditionalInfoRequestDto;
import net.dutymate.api.member.dto.AdditionalInfoResponseDto;
import net.dutymate.api.member.dto.LoginRequestDto;
import net.dutymate.api.member.dto.LoginResponseDto;
import net.dutymate.api.member.dto.SignUpRequestDto;
import net.dutymate.api.member.service.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {

	private final MemberService memberService;

	@PostMapping
	public ResponseEntity<?> signUp(@RequestBody SignUpRequestDto signUpRequestDto) {
		LoginResponseDto loginResponseDto = memberService.signUp(signUpRequestDto);
		return ResponseEntity.ok(loginResponseDto);
	}

	@GetMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequestDto) {
		LoginResponseDto loginResponseDto = memberService.login(loginRequestDto);
		return ResponseEntity.ok(loginResponseDto);
	}

	@GetMapping("/login/kakao")
	public ResponseEntity<?> kakaoLogin(@RequestParam String code) {
		LoginResponseDto loginResponseDto = memberService.kakaoLogin(code);
		return ResponseEntity.ok(loginResponseDto);
	}

	@GetMapping("/login/google")
	public ResponseEntity<?> googleLogin(@RequestParam String code) {
		LoginResponseDto loginResponseDto = memberService.googleLogin(code);
		return ResponseEntity.ok(loginResponseDto);
	}

	@PostMapping("/info")
	public ResponseEntity<?> addAdditionalInfo(
		@RequestBody AdditionalInfoRequestDto additionalInfoRequestDto,
		@Auth Member member) {
		AdditionalInfoResponseDto additionalInfoResponseDto
			= memberService.addAdditionalInfo(member, additionalInfoRequestDto);
		return ResponseEntity.ok(additionalInfoResponseDto);
	}
}
