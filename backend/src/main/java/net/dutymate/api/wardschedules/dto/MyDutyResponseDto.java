package net.dutymate.api.wardschedules.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MyDutyResponseDto {

	private Integer year;
	private Integer month;
	private String prevShifts;
	private String nextShifts;
	private String shifts;

	public static MyDutyResponseDto of(
		Integer year, Integer month, String prevShifts, String nextShifts, String shifts) {
		return MyDutyResponseDto.builder()
			.year(year)
			.month(month)
			.prevShifts(prevShifts)
			.nextShifts(nextShifts)
			.shifts(shifts)
			.build();
	}
}
