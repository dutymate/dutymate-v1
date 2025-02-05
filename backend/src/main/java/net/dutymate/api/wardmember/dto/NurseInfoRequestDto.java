package net.dutymate.api.wardmember.dto;

import net.dutymate.api.enumclass.SkillLevel;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NurseInfoRequestDto {

	private String shift;
	private SkillLevel skillLevel;
	private String memo;
	private String role;

}
