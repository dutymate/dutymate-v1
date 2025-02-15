package net.dutymate.api.comunity.dto;

import net.dutymate.api.entity.Member;
import net.dutymate.api.entity.community.Board;
import net.dutymate.api.entity.community.Comment;

import lombok.Data;

@Data
public class CommentRequestDto {

	private String content;

	public Comment toComment(Board board, Member member) {
		return Comment.builder()
			.board(board)
			.member(member)
			.content(content)
			.build();
	}
}
