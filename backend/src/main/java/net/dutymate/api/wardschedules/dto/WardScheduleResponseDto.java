package net.dutymate.api.wardschedules.dto;

import java.util.List;

import net.dutymate.api.enumclass.Role;
import net.dutymate.api.enumclass.Shift;
import net.dutymate.api.wardschedules.collections.WardSchedule;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WardScheduleResponseDto {

	private String id;
	private Integer year;
	private Integer month;
	private Integer invalidCnt;

	private List<NurseShifts> duty;
	private List<Issue> issues;
	// private List<History> histories;

	public static WardScheduleResponseDto of(
		String id, Integer year, Integer month, Integer invalidCnt, List<NurseShifts> duty, List<Issue> issues) {
		return WardScheduleResponseDto.builder()
			.id(id)
			.year(year)
			.month(month)
			.invalidCnt(invalidCnt)
			.duty(duty)
			.issues(issues)
			.build();
	}

	@Data
	@Builder
	public static class NurseShifts {

		private Long memberId;
		private String name;
		private Role role;
		private String prevShifts;
		private String shifts;

		public static NurseShifts of(WardSchedule.NurseShift nurseShift) {
			return NurseShifts.builder()
				.memberId(nurseShift.getMemberId())
				.shifts(nurseShift.getShifts())
				.build();
		}
	}

	@Data
	@Builder
	public static class Issue {

		private String name;
		private Integer startDate;
		private Integer endDate;
		private Shift endDateShift;
		private String message;

	}

	@Data
	public static class History {

		private Integer index;
		private Long memberId;
		private String name;
		private Shift before;
		private Shift after;
		private Integer modifiedDay;
		private Boolean isAutoCreated;
	}
}
