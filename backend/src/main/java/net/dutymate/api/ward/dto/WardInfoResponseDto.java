package net.dutymate.api.ward.dto;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WardInfoResponseDto {

	private String wardCode;
	private String wardName;
	private String hospitalName;
	private List<Nurse> nurses;

	@Builder
	public static class Nurse {

		private Long memberId;
		private String name;
		private String gender;
		private String role;
		private int grade;
		private String shift;
		private String skillLevel;
		private String memo;

	}

}
