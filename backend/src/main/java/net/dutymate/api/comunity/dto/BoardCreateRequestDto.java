package net.dutymate.api.comunity.dto;

import net.dutymate.api.entity.Member;
import net.dutymate.api.entity.community.Board;
import net.dutymate.api.enumclass.Category;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BoardCreateRequestDto {

	private String title;
	private String content;
	private Category category;
	private String boardImgUrl;

	public Board toBoard(Member member, BoardCreateRequestDto requestDto) {
		return Board.builder()
			.member(member)
			.title(requestDto.getTitle())
			.content(requestDto.getContent())
			.category(requestDto.getCategory())
			.boardImageUrl(requestDto.getBoardImgUrl())
			.viewCnt(0)
			.likesCntLow(0)
			.likesCntMid(0)
			.likesCntHigh(0)
			.build();
	}
}
