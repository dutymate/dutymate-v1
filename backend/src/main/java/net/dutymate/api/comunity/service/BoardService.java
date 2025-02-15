package net.dutymate.api.comunity.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.dutymate.api.comunity.dto.BoardCreateRequestDto;
import net.dutymate.api.comunity.repository.BoardRepository;
import net.dutymate.api.entity.Member;
import net.dutymate.api.entity.community.Board;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {
	private final BoardRepository boardRepository;

	@Transactional
	public ResponseEntity<?> createBoard(BoardCreateRequestDto boardCreateRequestDto, Member member) {

		Board newBoard = boardCreateRequestDto.toBoard(member, boardCreateRequestDto);
		member.getBoardList().add(newBoard);
		boardRepository.save(newBoard);

		return ResponseEntity.ok().build();
	}
}
