package net.dutymate.api.wardSchedules.document;

import java.util.List;

import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.Data;

@Document(collection = "ward_schedules")
@CompoundIndexes({
	@CompoundIndex(name = "ward_year_month_idx", def = "{'wardId' : 1, 'year' : 1, 'month' : 1}", unique = true)
})
@Data
public class WardSchedule {

	// MongoDB에서 기본적으로 생성하는 ObjectId
	@Id
	private String id;

	private Long wardId;
	private int year;
	private int month;

	// 듀티표 리스트
	private List<Duty> duties;

	// TODO 변경 이력
	// private List<History> history;
}
