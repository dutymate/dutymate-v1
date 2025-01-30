package net.dutymate.api.request.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.dutymate.api.request.dto.RequestCreateDto;
import net.dutymate.api.request.service.RequestService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RequestController {

	private final RequestService requestService;

	@PostMapping("/request")
	public ResponseEntity<?> createRequest(@RequestBody RequestCreateDto requestCreateDto) {

		requestService.createRequest(requestCreateDto);
		return ResponseEntity.ok().build();
	}

}
