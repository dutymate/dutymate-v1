package net.dutymate.api.wardmember.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.dutymate.api.wardmember.dto.NurseInfoRequestDto;
import net.dutymate.api.wardmember.service.WardMemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/ward")
@RequiredArgsConstructor
public class WardMemberController {

	private final WardMemberService wardMemberService;

	// 간호사 정보 수정하기log
	@PutMapping("/member/{memberId}")
	public ResponseEntity<?> updateWardMemberInfo(@PathVariable Long memberId,
		@RequestBody NurseInfoRequestDto nurseInfoRequestDto) {

		wardMemberService.updateWardMember(memberId, nurseInfoRequestDto);
		return ResponseEntity.ok().build();
	}
}
