package net.dutymate.api.community.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.dutymate.api.annotation.Auth;
import net.dutymate.api.community.dto.RecommendResponseDto;
import net.dutymate.api.community.service.BoardCurationService;
import net.dutymate.api.entity.Member;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class RecommendController {

	private final BoardCurationService boardCurationService;

	@GetMapping("/recommend")
	public ResponseEntity<RecommendResponseDto> recommend(@Auth Member member) {

		return ResponseEntity.ok(boardCurationService.getCuratedBoards(member));
	}

}
