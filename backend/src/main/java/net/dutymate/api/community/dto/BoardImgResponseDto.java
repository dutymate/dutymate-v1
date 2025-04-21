package net.dutymate.api.community.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BoardImgResponseDto {

	private String boardImgUrl;

	public static BoardImgResponseDto of(String boardImgUrl) {
		return BoardImgResponseDto.builder()
			.boardImgUrl(boardImgUrl)
			.build();
	}
}
