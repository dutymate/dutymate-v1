package net.dutymate.api.ward.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.dutymate.api.annotation.Auth;
import net.dutymate.api.entity.Member;
import net.dutymate.api.ward.dto.RequestWardDto;
import net.dutymate.api.ward.dto.WardInfoResponseDto;
import net.dutymate.api.ward.service.WardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/ward")
@RequiredArgsConstructor
public class WardController {

	private final WardService wardService;

	// 병동 생성하기 (관리자)
	@PostMapping
	public ResponseEntity<?> addWard(@RequestBody RequestWardDto requestWardDto, @Auth Member member) {
		wardService.createWard(requestWardDto, member);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	// 병동 입장하기 (멤버) : 유효한 코드인지 체크
	@GetMapping("/check-code")
	public ResponseEntity<?> checkCode(@RequestParam String code, @Auth Member member) {
		wardService.checkInvalidCode(code, member);
		return ResponseEntity.status(HttpStatus.OK).build();
	}

	// 병동 정보 조회하기 (관리자)
	@GetMapping
	public ResponseEntity<?> getWards(@Auth Member member) {
		WardInfoResponseDto wardInfoResponseDto = wardService.getWardInfo(member);
		return ResponseEntity.ok(wardInfoResponseDto);
	}
}
