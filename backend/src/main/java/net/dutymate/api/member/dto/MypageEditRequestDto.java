package net.dutymate.api.member.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MypageEditRequestDto {

	private String name;
	private String nickname;
	private String gender;
	private Integer grade;
}
