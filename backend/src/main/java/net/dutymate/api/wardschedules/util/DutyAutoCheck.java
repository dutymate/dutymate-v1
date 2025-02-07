package net.dutymate.api.wardschedules.util;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.IntStream;

import org.springframework.stereotype.Component;

import net.dutymate.api.entity.Member;
import net.dutymate.api.enumclass.Shift;
import net.dutymate.api.member.service.MemberService;
import net.dutymate.api.rule.dto.RuleResponseDto;
import net.dutymate.api.rule.service.RuleService;
import net.dutymate.api.wardschedules.dto.WardScheduleResponseDto;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DutyAutoCheck {

	private final RuleService ruleService;
	private final MemberService memberService;
	private static final String[] SHIFTS = {"D", "E", "N"};
	private static final String NIGHT_SHIFT_VIOLATION_MESSAGE = "Night 근무 규칙을 위반했습니다.";
	private static final String MAX_SHIFT_VIOLATION_MESSAGE = "최대 근무일 규칙을 위반했습니다.";
	private static final String[] FORBIDDEN_PATTERNS = {"ND", "NE", "ED", "NOD"};

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

		List<WardScheduleResponseDto.Issue> result = new ArrayList<>();
		String shifts = ns.getPrevShifts().concat(ns.getShifts());
		Member member = memberService.getMemberById(ns.getMemberId());
		RuleResponseDto rule = ruleService.getRule(member);
		String name = ns.getName();
		int prevShfitsDay = ns.getPrevShifts().length();

		nightIssuesGenerator(name, prevShfitsDay, shifts, rule, result);
		maxShiftsIssuesGenerator(name, prevShfitsDay, shifts, rule, result);
		specificPatternIssuesGenerator(name, prevShfitsDay, shifts, result);
		return result;
	}

	private void nightIssuesGenerator(String name, int prevShiftsDay,
		String shifts, RuleResponseDto rule, List<WardScheduleResponseDto.Issue> issues) {

		int index = shifts.indexOf(Shift.N.getValue(), prevShiftsDay);
		while (index != -1) {
			int nightCnt = 0;

			while (index + nightCnt < shifts.length() && shifts.charAt(index + nightCnt) == 'N') {
				nightCnt++;
			}

			if (nightCnt < rule.getMinN() || nightCnt > rule.getMaxN()) {
				issues.add(WardScheduleResponseDto.Issue.builder()
					.name(name)
					.startDate(index + 1 - prevShiftsDay)
					.endDate(index + nightCnt - prevShiftsDay)
					.endDateShift(Shift.N)
					.message(NIGHT_SHIFT_VIOLATION_MESSAGE)
					.build());
			}

			index = shifts.indexOf(Shift.N.getValue(), index + nightCnt);

		}
	}

	private void maxShiftsIssuesGenerator(String name, int prevShiftsDay,
		String shifts, RuleResponseDto rule, List<WardScheduleResponseDto.Issue> issues) {
		int index = prevShiftsDay;
		while (index < shifts.length()
			&& (shifts.charAt(index) == 'X'
			|| shifts.charAt(index) == 'O')) {
			index++;
		}
		while (index != -1) {
			int shiftCnt = 0;

			while (index + shiftCnt < shifts.length()
				&& (shifts.charAt(index + shiftCnt) == 'D'
				|| shifts.charAt(index + shiftCnt) == 'E'
				|| shifts.charAt(index + shiftCnt) == 'N')) {
				shiftCnt++;
			}

			if (shiftCnt > rule.getMaxShift()) {
				issues.add(WardScheduleResponseDto.Issue.builder()
					.name(name)
					.startDate(index + 1 - prevShiftsDay)
					.endDate(index + shiftCnt - prevShiftsDay)
					.endDateShift(Shift.valueOf(String.valueOf(shifts.charAt(index + shiftCnt - 1))))
					.message(MAX_SHIFT_VIOLATION_MESSAGE)
					.build());
			}

			final int searchStart = index + shiftCnt;
			index = Arrays.asList(Shift.D, Shift.E, Shift.N).stream()
				.mapToInt(shift -> shifts.indexOf(shift.getValue(), searchStart))
				.min()
				.orElse(-1);
		}
	}

	private void specificPatternIssuesGenerator(String name, int prevShiftsDay,
		String shifts, List<WardScheduleResponseDto.Issue> issues) {

		for (String pattern : FORBIDDEN_PATTERNS) {

			int index = shifts.indexOf(pattern, prevShiftsDay);

			while (index != -1) {

				int startDate = index + 1 - prevShiftsDay;
				int endDate = index + pattern.length() - prevShiftsDay;

				if (startDate > 0 && endDate <= shifts.length() - prevShiftsDay) {
					issues.add(WardScheduleResponseDto.Issue.builder()
						.name(name)
						.startDate(startDate)
						.endDate(endDate)
						.endDateShift(Shift.valueOf(String.valueOf(pattern.charAt(pattern.length() - 1))))
						.message(pattern + "형태의 근무는 허용되지 않습니다.")
						.build());
				}

				index = shifts.indexOf(pattern, index + 1);
			}
		}
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

	public List<String> generateAllCombinations(int maxShift) {
		List<String> result = new ArrayList<>();
		generateCombinations("", maxShift, result);
		return result;
	}

	private void generateCombinations(String current, int remaining, List<String> result) {
		// 기저 조건: 원하는 길이에 도달했을 때
		if (remaining == 0) {
			result.add(current);
			return;
		}

		for (String shift : SHIFTS) {
			generateCombinations(current + shift, remaining - 1, result);
		}
	}
}
