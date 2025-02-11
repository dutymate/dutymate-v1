package net.dutymate.api.ward.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.dutymate.api.annotation.Auth;
import net.dutymate.api.entity.Member;
import net.dutymate.api.ward.dto.HospitalNameResponseDto;
import net.dutymate.api.ward.dto.VirtualNameRequestDto;
import net.dutymate.api.ward.dto.WardInfoResponseDto;
import net.dutymate.api.ward.dto.WardRequestDto;
import net.dutymate.api.ward.service.WardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/ward")
@RequiredArgsConstructor
public class WardController {

	private final WardService wardService;

	// 병동 생성하기 (관리자)
	@PostMapping
	public ResponseEntity<?> addWard(@RequestBody WardRequestDto requestWardDto, @Auth Member member) {
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

	// 가상 간호사 추가 (관리자)
	@PostMapping("/member/virtual")
	public ResponseEntity<?> addVirtualMember(@Auth Member member) {
		wardService.addVirtualMember(member);
		return ResponseEntity.ok().build();
	}

	// 가상 간호사 이름 변경 (관리자)
	@PutMapping("/member/virtual/{memberId}")
	public ResponseEntity<?> changeVirtualMemberName(
		@PathVariable Long memberId,
		@RequestBody VirtualNameRequestDto virtualNameRequestDto,
		@Auth Member member) {
		wardService.changeVirtualMemberName(memberId, virtualNameRequestDto, member);
		return ResponseEntity.ok().build();
	}

	// 병원 이름 검색하기
	@GetMapping("/hospital")
	public ResponseEntity<?> getHospital(@RequestParam String name) {
		List<HospitalNameResponseDto> hospitalNameResponseDto = wardService.findHospitalName(name);
		return ResponseEntity.ok(hospitalNameResponseDto);
	}
}
