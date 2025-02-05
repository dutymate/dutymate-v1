package net.dutymate.api.records;

import java.time.LocalDateTime;

public record YearMonth(Integer year, Integer month) {
	// 레코드 생성 시 year 또는 month가 null이면 현재 날짜 기준으로 레코드가 생성
	public YearMonth(Integer year, Integer month) {
		if (year == null || month == null) {
			LocalDateTime now = LocalDateTime.now();
			this.year = now.getYear();
			this.month = now.getMonthValue();
		} else {
			this.year = year;
			this.month = month;
		}
	}

	public int daysInMonth() {
		return java.time.YearMonth.of(year, month).lengthOfMonth();
	}

	public String initializeShifts() {
		return "X".repeat(daysInMonth());
	}

	public YearMonth prevYearMonth() {
		int prevYear = (month == 1) ? year - 1 : year;
		int prevMonth = (month == 1) ? 12 : month - 1;
		return new YearMonth(prevYear, prevMonth);
	}

	public YearMonth nextYearMonth() {
		int nextYear = (month == 12) ? year + 1 : year;
		int nextMonth = (month == 12) ? 1 : month + 1;
		return new YearMonth(nextYear, nextMonth);
	}

	public static YearMonth nowYearMonth() {
		LocalDateTime now = LocalDateTime.now();
		return new YearMonth(now.getYear(), now.getMonthValue());
	}
}
