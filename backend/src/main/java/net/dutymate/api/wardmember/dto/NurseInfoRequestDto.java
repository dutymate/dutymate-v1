package net.dutymate.api.wardmember.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NurseInfoRequestDto {

	private String shift;
	private String skillLevel;
	private String memo;
	private String role;

}
