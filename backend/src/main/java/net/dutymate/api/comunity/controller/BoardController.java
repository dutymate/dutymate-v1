package net.dutymate.api.comunity.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.dutymate.api.annotation.Auth;
import net.dutymate.api.comunity.dto.BoardCreateRequestDto;
import net.dutymate.api.comunity.service.BoardService;
import net.dutymate.api.entity.Member;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class BoardController {

	private final BoardService boardService;

	@PostMapping
	public ResponseEntity<?> createBoard(
		@RequestBody BoardCreateRequestDto boardCreateRequestDto,
		@Auth Member member) {

		return boardService.createBoard(boardCreateRequestDto, member);
	}

}
