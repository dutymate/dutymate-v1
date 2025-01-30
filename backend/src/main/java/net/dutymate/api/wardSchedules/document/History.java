package net.dutymate.api.wardSchedules.document;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class History {
	private int index;
	private int memberId;
	private String name;
	private String before;
	private String after;
	private int modifiedDay;
	private boolean isAutoCreated;
}
