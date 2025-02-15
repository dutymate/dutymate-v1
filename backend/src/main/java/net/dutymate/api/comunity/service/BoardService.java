package net.dutymate.api.comunity.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import net.dutymate.api.comunity.dto.BoardCreateRequestDto;
import net.dutymate.api.comunity.dto.BoardDetailResponseDto;
import net.dutymate.api.comunity.dto.BoardListResponseDto;
import net.dutymate.api.comunity.repository.BoardRepository;
import net.dutymate.api.entity.Member;
import net.dutymate.api.entity.community.Board;
import net.dutymate.api.enumclass.Category;

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

	@Transactional(readOnly = true)
	public List<BoardListResponseDto> getAllBoard(Category category) {
		if (category == null) {
			return boardRepository.findAll()
				.stream()
				.map(BoardListResponseDto::of)
				.toList();
		}

		// TODO cateogry == HOT 인 경우 별도 조회 로직 필요함

		return boardRepository.findAllByCategory(category)
			.stream()
			.map(BoardListResponseDto::of)
			.toList();
	}

	@Transactional
	public BoardDetailResponseDto getBoard(Long boardId, Member member) {
		Board board = boardRepository.findById(boardId)
			.orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "존재하지 않는 게시글입니다."));
		board.increaseViewCnt();
		return BoardDetailResponseDto.of(board, member);
	}

	@Transactional
	public void removeBoard(Long boardId, Member member) {
		if (!boardRepository.existsByBoardIdAndMember(boardId, member)) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "존재하지 않거나 본인이 작성한 글이 아닙니다.");
		}

		boardRepository.deleteById(boardId);
	}
}
