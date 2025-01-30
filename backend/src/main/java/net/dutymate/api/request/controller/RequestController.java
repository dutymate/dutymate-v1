package net.dutymate.api.request.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.dutymate.api.annotation.Auth;
import net.dutymate.api.entity.Member;
import net.dutymate.api.request.dto.RequestCreateDto;
import net.dutymate.api.request.dto.RequestResponseDto;
import net.dutymate.api.request.service.RequestService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RequestController {

	private final RequestService requestService;

	@PostMapping("/request")
	public ResponseEntity<?> createRequest(
		@Auth Member member,
		@RequestBody RequestCreateDto requestCreateDto) {

		requestService.createRequest(requestCreateDto, member);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/request")
	public ResponseEntity<List<RequestResponseDto>> readMyRequest(@Auth Member member) {
		List<RequestResponseDto> myRequests = requestService.readMyRequest(member);
		return ResponseEntity.ok(myRequests);
	}

}
