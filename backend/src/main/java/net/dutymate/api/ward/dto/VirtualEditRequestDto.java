package net.dutymate.api.ward.dto;

import net.dutymate.api.enumclass.Gender;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VirtualEditRequestDto {

	private String name;
	private Gender gender;
	private Integer grade;
}
