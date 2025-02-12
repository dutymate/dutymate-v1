package net.dutymate.api.autoschedule.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyScheduleDTO {
	private Integer idx;
	private List<DutyAssignmentDTO> duty;
	private ScheduleHistoryDTO history;

	@Getter
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class DutyAssignmentDTO {
		private Long memberId;
		private String shifts;  // 31일치 근무 문자열 (예: "DDENODEE...")
	}

	@Getter
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class ScheduleHistoryDTO {
		private Long memberId;
		private String name;
		private String before;
		private String after;
		private Integer modifiedDay;
		private Boolean isAutoCreated;
	}
}