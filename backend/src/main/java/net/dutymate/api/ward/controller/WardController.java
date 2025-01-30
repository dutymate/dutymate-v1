package net.dutymate.api.ward.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.dutymate.api.annotation.Auth;
import net.dutymate.api.entity.Member;
import net.dutymate.api.entity.Ward;
import net.dutymate.api.ward.dto.RequestWardDto;
import net.dutymate.api.ward.service.WardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/ward")
@RequiredArgsConstructor
public class WardController {

	private final WardService wardService;

	@PostMapping
	public ResponseEntity<Ward> addWard(@RequestBody RequestWardDto requestWardDto, @Auth Member member) {
		Ward createdWard = wardService.createWard(requestWardDto, member);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdWard);
	}
}
