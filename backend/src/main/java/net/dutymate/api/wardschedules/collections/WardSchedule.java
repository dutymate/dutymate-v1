package net.dutymate.api.wardschedules.collections;

import java.util.List;

import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "ward_schedules")
@CompoundIndexes({
	@CompoundIndex(name = "ward_year_month_idx", def = "{'wardId' : 1, 'year' : 1, 'month' : 1}", unique = true)
})
public class WardSchedule {

	// MongoDB에서 기본적으로 생성하는 ObjectId
	@Id
	private String id;

	@Field("ward_id")
	private Long wardId;
	private int year;
	private int month;

	// 듀티표 리스트
	private List<Duty> duties;

	// TODO 변경 이력
	// private List<History> history;

	@Getter
	@NoArgsConstructor(access = AccessLevel.PROTECTED)
	@AllArgsConstructor(access = AccessLevel.PRIVATE)
	@Builder
	public static class Duty {
		private List<NurseShift> duty;

		public void addNurseShift(NurseShift nurseShift) {
			this.duty.add(nurseShift);
		}
	}

	@Getter
	@NoArgsConstructor(access = AccessLevel.PROTECTED)
	@AllArgsConstructor(access = AccessLevel.PRIVATE)
	@Builder
	public static class NurseShift {
		private Long memberId;
		private String shifts;

		public void changeShifts(String shifts) {
			this.shifts = shifts;
		}
	}

	// TODO History 변경 내역 추가 예정
	// @Getter
	// @NoArgsConstructor(access = AccessLevel.PROTECTED)
	// @AllArgsConstructor(access = AccessLevel.PRIVATE)
	// @Builder
	// public class History {
	// 	private int index;
	// 	private int memberId;
	// 	private String name;
	// 	private String before;
	// 	private String after;
	// 	private int modifiedDay;
	// 	private boolean isAutoCreated;
	// }
}
