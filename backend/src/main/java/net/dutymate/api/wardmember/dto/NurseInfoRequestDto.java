package net.dutymate.api.wardmember.dto;

import net.dutymate.api.enumclass.Role;
import net.dutymate.api.enumclass.ShiftType;
import net.dutymate.api.enumclass.SkillLevel;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NurseInfoRequestDto {

	private ShiftType shiftType;
	private SkillLevel skillLevel;
	private String memo;
	private Role role;

	public static NurseInfoRequestDto toNurseInfoRequestDto(ShiftType shiftType, SkillLevel skillLevel, String memo,
		Role role) {
		return NurseInfoRequestDto.builder()
			.shiftType(shiftType)
			.skillLevel(skillLevel)
			.memo(memo)
			.role(role)
			.build();
	}
}
