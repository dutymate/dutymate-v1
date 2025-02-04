package net.dutymate.api.wardschedules.util;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.stereotype.Component;

import net.dutymate.api.enumclass.Shift;
import net.dutymate.api.rule.service.RuleService;
import net.dutymate.api.wardschedules.dto.WardScheduleResponseDto;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DutyAutoCheck {

	private final RuleService ruleService;

	public List<WardScheduleResponseDto.Issue> check(List<WardScheduleResponseDto.NurseShifts> nurseShiftsDto, int year,
		int month) {
		List<WardScheduleResponseDto.Issue> issues = new ArrayList<>();
		for (WardScheduleResponseDto.NurseShifts ns : nurseShiftsDto) {
			List<WardScheduleResponseDto.Issue> personalIssues = checkPersonalDuty(ns);
			if (!personalIssues.isEmpty()) {
				issues.addAll(personalIssues);
			}
		}

		return issues;
	}

	private List<WardScheduleResponseDto.Issue> checkPersonalDuty(WardScheduleResponseDto.NurseShifts ns) {

		String shifts = ns.getPrevShifts().concat(ns.getShifts());
		String[] hardPatterns = {"DDDDDD", "EEEEEE", "NNNN", "NOD", "ND", "NE", "ED"};

		// 추후 패턴 분리 예정
		// String[] softPatterns = {"NOD", "ED"};

		int prevShifts = ns.getPrevShifts().length();

		return Arrays.stream(hardPatterns)
			.flatMap(pattern -> {
				List<Integer> indices = new ArrayList<>();
				int index = shifts.indexOf(pattern);
				while (index != -1) {
					indices.add(index);
					index = shifts.indexOf(pattern, index + 1);
				}
				return indices.stream().map(idx -> WardScheduleResponseDto.Issue.builder()
					.name(ns.getName())
					.startDate(idx + 1 - prevShifts)
					.endDate(idx + pattern.length() - prevShifts)
					.endDateShift(Shift.valueOf(String.valueOf(shifts.charAt(idx + pattern.length() - 1))))
					.message(pattern + " 형태의 근무는 불가능 합니다.")
					.build());
			})
			.collect(Collectors.toList());                                     // 16

	}

	private Map<Integer, Boolean> getWeekendDays(int year, int month) {
		// 해당 월의 첫날 구하기
		LocalDate firstDay = LocalDate.of(year, month, 1);

		// 해당 월의 마지막 날 구하기
		LocalDate lastDay = firstDay.withDayOfMonth(
			firstDay.lengthOfMonth()
		);

		// 결과를 저장할 Map (날짜 -> 주말여부)
		Map<Integer, Boolean> weekendMap = new HashMap<>();

		// 첫날부터 마지막날까지 순회
		LocalDate currentDate = firstDay;
		while (!currentDate.isAfter(lastDay)) {
			DayOfWeek dayOfWeek = currentDate.getDayOfWeek();
			boolean isWeekend = dayOfWeek == DayOfWeek.SATURDAY
				|| dayOfWeek == DayOfWeek.SUNDAY;

			weekendMap.put(currentDate.getDayOfMonth(), isWeekend);
			currentDate = currentDate.plusDays(1);
		}

		return weekendMap;
	}

	private int[][] wardInfo(int year, int month, List<WardScheduleResponseDto.NurseShifts> nurseShiftsDto) {

		//달의 일수 (30,31,28,29)
		LocalDate date = LocalDate.of(year, month, 1);
		int daysInMonth = date.lengthOfMonth();

		int[][] result = new int[5][daysInMonth + 1];

		IntStream.rangeClosed(1, daysInMonth)
			.forEach(day ->
				nurseShiftsDto.stream()
					.map(ns -> ns.getShifts().charAt(day - 1))
					.forEach(shift -> {
						switch (shift) {
							case 'D' -> result[Shift.D.ordinal()][day]++;
							case 'E' -> result[Shift.E.ordinal()][day]++;
							case 'N' -> result[Shift.N.ordinal()][day]++;
							case 'O' -> result[Shift.O.ordinal()][day]++;
							case 'X' -> result[Shift.X.ordinal()][day]++;
						}
					})
			);
		return result;
	}

}
