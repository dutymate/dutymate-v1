package net.dutymate.api.autoschedule.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import net.dutymate.api.entity.Rule;
import net.dutymate.api.entity.WardMember;
import net.dutymate.api.enumclass.Shift;
import net.dutymate.api.records.YearMonth;
import net.dutymate.api.wardschedules.collections.WardSchedule;

import lombok.Getter;

@Service
public class ScheduleGenerator {
	private static final int PREV_SHIFTS_LENGTH = 4;
	private static final String DEFAULT_PREV_SHIFTS = "OOOO";

	//일별 근무자를 관리하기 위한 class
	private class DailySchedule {
		Map<Shift, List<Long>> assignments = new HashMap<>();

		public DailySchedule() {
			for (Shift type : Shift.values()) {
				assignments.put(type, new ArrayList<>());
			}
		}
	}

	//월별 근무자 관리를 위한 class
	private class MonthlySchedule {

		Map<Integer, DailySchedule> schedules = new HashMap<>();

		public MonthlySchedule(int daysInMonth) {
			for (int day = 1; day <= daysInMonth; day++) {
				schedules.put(day, new DailySchedule());
			}
		}

		// 기존 요청된 근무들을 먼저 반영
		public void applyPreAssignedShifts(WardSchedule.Duty duty) {
			for (WardSchedule.NurseShift nurseShift : duty.getDuty()) {
				String shifts = nurseShift.getShifts();

				for (int day = 1; day <= shifts.length(); day++) {
					char shiftChar = shifts.charAt(day - 1);
					// X가 아닌 경우만 처리 (이미 요청된 근무)
					if (shiftChar != 'X') {
						Shift shift = Shift.valueOf(String.valueOf(shiftChar));
						assignNurse(day, shift, nurseShift.getMemberId());
					}
				}
			}
		}

		public void assignNurse(int day, Shift shift, Long nurseId) {
			schedules.get(day).assignments.get(shift).add(nurseId);
		}

		// 생성된 스케줄을 WardSchedule 형식으로 변환
		public void applyToWardSchedule(WardSchedule.Duty duty) {
			Map<Long, StringBuilder> nurseSchedules = new HashMap<>();

			// 각 간호사별 근무 문자열 초기화
			for (WardSchedule.NurseShift nurseShift : duty.getDuty()) {
				nurseSchedules.put(nurseShift.getMemberId(), new StringBuilder());
			}

			// 일자별로 각 간호사의 근무를 기록
			for (int day = 1; day <= schedules.size(); day++) {
				DailySchedule dailySchedule = schedules.get(day);
				for (Long nurseId : nurseSchedules.keySet()) {
					Shift assigned = findAssignedShift(dailySchedule, nurseId);
					nurseSchedules.get(nurseId).append(assigned.toString());
				}
			}

			// 최종 근무표 적용
			for (WardSchedule.NurseShift nurseShift : duty.getDuty()) {
				nurseShift.changeShifts(nurseSchedules.get(nurseShift.getMemberId()).toString());
			}
		}

		private Shift findAssignedShift(DailySchedule dailySchedule, Long nurseId) {
			for (Map.Entry<Shift, List<Long>> entry : dailySchedule.assignments.entrySet()) {
				if (entry.getValue().contains(nurseId)) {
					return entry.getKey();
				}
			}
			return Shift.O;
		}
	}

	@Getter
	public class MemberStats {
		// 시프트별 근무 횟수
		private Map<Shift, Integer> shiftCounts = new HashMap<>();
		// 연속 근무 일수
		private int consecutiveWorkDays = 0;
		// 연속 야간 근무 일수
		private int consecutiveNights = 0;
		// 마지막 근무 타입
		private Shift lastShift = null;
		// 마지막 근무 일자
		private int lastWorkDay = -1;

		public MemberStats() {
			for (Shift type : Shift.values()) {
				shiftCounts.put(type, 0);
			}
		}

		// Getters
		public Map<Shift, Integer> getShiftCounts() {
			return shiftCounts;
		}

		public int getConsecutiveWorkDays() {
			return consecutiveWorkDays;
		}

		public int getConsecutiveNights() {
			return consecutiveNights;
		}

		public Shift getLastShift() {
			return lastShift;
		}

		public int getLastWorkDay() {
			return lastWorkDay;
		}

		// 근무 통계 업데이트
		public void updateStats(Shift shiftType, int day) {
			shiftCounts.merge(shiftType, 1, Integer::sum);

			if (shiftType != Shift.O && shiftType != Shift.X) {
				consecutiveWorkDays = (lastShift != Shift.O && lastShift != Shift.X) ?
					consecutiveWorkDays + 1 : 1;

				if (shiftType == Shift.N) {
					consecutiveNights = (lastShift == Shift.N) ? consecutiveNights + 1 : 1;
				} else {
					consecutiveNights = 0;
				}

				lastWorkDay = day;
			} else {
				consecutiveWorkDays = 0;
				consecutiveNights = 0;
			}

			lastShift = shiftType;
		}
	}

	public int neededNurseCount(YearMonth yearMonth, Rule rule) {
		int neededNurseCount = 1;
		int weekDayNeededShift = rule.getWdayDCnt() + rule.getWdayECnt() + rule.getWdayNCnt();
		int endDayNeededShift = rule.getWendDCnt() + rule.getWendECnt() + rule.getWendNCnt();

		int totalShifts =
			weekDayNeededShift * yearMonth.weekDaysInMonth() +
				endDayNeededShift * (yearMonth.daysInMonth() - yearMonth.weekDaysInMonth());

		while (neededNurseCount * yearMonth.daysInMonth() < totalShifts) {
			neededNurseCount++;
		}
		return neededNurseCount;
	}

	public void generateSchedule(WardSchedule wardSchedule, Rule rule, List<WardMember> wardMembers,
		List<WardSchedule.NurseShift> prevNurseShifts, YearMonth yearMonth) {

		// 1. 이전 달의 근무 기록 처리
		Map<Long, String> prevShiftsMap = processPreviousShifts(prevNurseShifts);

		// 2. 각 간호사별 통계 초기화
		Map<Long, MemberStats> memberStatsMap = initializeMemberStats(wardMembers);

		// 3. 이전 근무 기록을 통계에 반영
		applyPreviousShifts(prevShiftsMap, memberStatsMap);

		// 4. 실제 스케줄 생성
		generateDailySchedules(wardSchedule.getDuties().get(wardSchedule.getNowIdx()),
			rule, wardMembers, memberStatsMap, yearMonth);

		printScheduleStatistics(wardSchedule.getDuties().get(wardSchedule.getNowIdx()), wardMembers);

	}

	private Map<Long, MemberStats> initializeMemberStats(List<WardMember> wardMembers) {
		Map<Long, MemberStats> statsMap = new HashMap<>();
		for (WardMember member : wardMembers) {
			statsMap.put(member.getMember().getMemberId(), new MemberStats());
		}
		return statsMap;
	}

	private void applyPreviousShifts(Map<Long, String> prevShiftsMap, Map<Long, MemberStats> memberStatsMap) {
		for (Map.Entry<Long, String> entry : prevShiftsMap.entrySet()) {
			Long memberId = entry.getKey();
			String shifts = entry.getValue();
			MemberStats stats = memberStatsMap.get(memberId);

			if (stats != null) {
				// 이전 근무 기록의 각 시프트를 통계에 반영
				for (int i = 0; i < shifts.length(); i++) {
					Shift shiftType = Shift.valueOf(String.valueOf(shifts.charAt(i)));
					stats.updateStats(shiftType, -(shifts.length() - i)); // 음수 일자로 이전 근무 표시
				}
			}
		}
	}

	private void generateDailySchedules(WardSchedule.Duty currentDuty, Rule rule,
		List<WardMember> wardMembers,
		Map<Long, MemberStats> memberStatsMap,
		YearMonth yearMonth) {

		// 1. 월간 스케줄 생성
		MonthlySchedule monthlySchedule = new MonthlySchedule(yearMonth.daysInMonth());

		// 2. 기존 요청된 근무(X가 아닌) 먼저 반영하고 통계 업데이트
		monthlySchedule.applyPreAssignedShifts(currentDuty);
		for (WardSchedule.NurseShift nurseShift : currentDuty.getDuty()) {
			String shifts = nurseShift.getShifts();
			for (int day = 1; day <= shifts.length(); day++) {
				char shiftChar = shifts.charAt(day - 1);
				if (shiftChar != 'X') {
					Shift shift = Shift.valueOf(String.valueOf(shiftChar));
					memberStatsMap.get(nurseShift.getMemberId()).updateStats(shift, day);
				}
			}
		}

		// 3. 각 날짜별로 스케줄 생성
		for (int day = 1; day <= yearMonth.daysInMonth(); day++) {
			boolean isWeekend = yearMonth.isWeekend(day);

			// 해당 날짜에 필요한 D, E, N 근무자 수 계산
			int requiredDay = isWeekend ? rule.getWendDCnt() : rule.getWdayDCnt();
			int requiredEvening = isWeekend ? rule.getWendECnt() : rule.getWdayECnt();
			int requiredNight = isWeekend ? rule.getWendNCnt() : rule.getWdayNCnt();

			DailySchedule dailySchedule = monthlySchedule.schedules.get(day);

			// 이미 배정된 인원 수 확인
			int assignedDay = dailySchedule.assignments.get(Shift.D).size();
			int assignedEvening = dailySchedule.assignments.get(Shift.E).size();
			int assignedNight = dailySchedule.assignments.get(Shift.N).size();

			// 4. Night 근무 우선 배정
			while (assignedNight < requiredNight) {
				Long bestNurse = findBestNurseForShift(day, Shift.N, wardMembers, memberStatsMap,
					dailySchedule, rule);
				if (bestNurse == null)
					break;

				monthlySchedule.assignNurse(day, Shift.N, bestNurse);
				memberStatsMap.get(bestNurse).updateStats(Shift.N, day);
				assignedNight++;
			}

			// 5. Day 근무 배정
			while (assignedDay < requiredDay) {
				Long bestNurse = findBestNurseForShift(day, Shift.D, wardMembers, memberStatsMap,
					dailySchedule, rule);
				if (bestNurse == null)
					break;

				monthlySchedule.assignNurse(day, Shift.D, bestNurse);
				memberStatsMap.get(bestNurse).updateStats(Shift.D, day);
				assignedDay++;
			}

			// 6. Evening 근무 배정
			while (assignedEvening < requiredEvening) {
				Long bestNurse = findBestNurseForShift(day, Shift.E, wardMembers, memberStatsMap,
					dailySchedule, rule);
				if (bestNurse == null)
					break;

				monthlySchedule.assignNurse(day, Shift.E, bestNurse);
				memberStatsMap.get(bestNurse).updateStats(Shift.E, day);
				assignedEvening++;
			}

			// 7. 나머지 간호사들은 Off 처리
			for (WardMember nurse : wardMembers) {
				Long nurseId = nurse.getMember().getMemberId();
				if (!isAssignedToAnyShift(nurseId, dailySchedule)) {
					memberStatsMap.get(nurseId).updateStats(Shift.O, day);
				}
			}
		}

		// 8. 최종 스케줄을 WardSchedule 형식으로 변환
		monthlySchedule.applyToWardSchedule(currentDuty);
	}

	private Long findBestNurseForShift(int day, Shift shift, List<WardMember> wardMembers,
		Map<Long, MemberStats> memberStatsMap, DailySchedule dailySchedule, Rule rule) {

		Long bestNurse = null;
		double minPenalty = Double.MAX_VALUE;

		for (WardMember nurse : wardMembers) {
			Long nurseId = nurse.getMember().getMemberId();

			// 이미 배정된 간호사는 제외
			if (isAssignedToAnyShift(nurseId, dailySchedule)) {
				continue;
			}

			// 배정 가능 여부 확인
			if (!isValidAssignment(nurseId, day, shift, memberStatsMap, rule)) {
				continue;
			}

			// 페널티 계산
			double penalty = calculatePenalty(nurseId, day, shift, memberStatsMap, rule);
			if (penalty < minPenalty) {
				minPenalty = penalty;
				bestNurse = nurseId;
			}
		}

		return bestNurse;
	}

	private boolean isAssignedToAnyShift(Long nurseId, DailySchedule dailySchedule) {
		return dailySchedule.assignments.values().stream()
			.anyMatch(nurses -> nurses.contains(nurseId));
	}

	//패널티 부여를 위한 메서드
	private double calculatePenalty(Long memberId, int day, Shift proposedShift,
		Map<Long, MemberStats> memberStatsMap, Rule rule) {
		MemberStats stats = memberStatsMap.get(memberId);
		double penalty = 0;

		// 1. 단일 근무/휴일에 대한 페널티
		if (stats.getLastShift() != null) {
			// 이전에 쉬다가 하루만 일하고 다시 쉬는 패턴 방지
			if (proposedShift != Shift.O && proposedShift != Shift.X &&
				(stats.getLastShift() == Shift.O || stats.getLastShift() == Shift.X) &&
				stats.getConsecutiveWorkDays() == 0) {
				penalty += 200;
			}

			// 이전에 일하다가 하루만 쉬고 다시 일하는 패턴 방지
			if ((proposedShift == Shift.O || proposedShift == Shift.X) &&
				stats.getLastShift() != Shift.O && stats.getLastShift() != Shift.X &&
				stats.getConsecutiveWorkDays() > 0) {
				penalty += 200;
			}

			// NOD 패턴 방지 (Night -> Off -> Day)
			if (proposedShift == Shift.D &&
				stats.getLastShift() == Shift.O &&
				day - stats.getLastWorkDay() == 1 &&
				stats.getConsecutiveNights() == 0 &&
				stats.getShiftCounts().get(Shift.N) > 0) {
				penalty += 1000; // NOD 패널티 증가
			}
		}

		// 2. 전체 근무일수 균형 맞추기
		double avgWorkDays = memberStatsMap.values().stream()
			.mapToInt(s -> s.getShiftCounts().values().stream()
				.mapToInt(Integer::intValue).sum()
				- s.getShiftCounts().get(Shift.O)
				- s.getShiftCounts().get(Shift.X))
			.average()
			.orElse(0);

		int memberWorkDays = stats.getShiftCounts().values().stream()
			.mapToInt(Integer::intValue).sum()
			- stats.getShiftCounts().get(Shift.O)
			- stats.getShiftCounts().get(Shift.X);

		penalty += (memberWorkDays - avgWorkDays) * 15;

		// 3. 근무 유형별 균형 맞추기
		for (Shift shift : new Shift[] {Shift.D, Shift.E, Shift.N}) {
			double avg = memberStatsMap.values().stream()
				.mapToInt(s -> s.getShiftCounts().get(shift))
				.average()
				.orElse(0);

			int currentCount = stats.getShiftCounts().get(shift);

			// 현재 근무가 이미 평균보다 많은 경우 큰 패널티
			if (shift == proposedShift && currentCount > avg) {
				penalty += Math.pow(currentCount - avg + 1, 2) * 100;
			}
		}

		// 근무 유형간 심각한 불균형에 대한 패널티
		for (Shift shift1 : new Shift[] {Shift.D, Shift.E, Shift.N}) {
			for (Shift shift2 : new Shift[] {Shift.D, Shift.E, Shift.N}) {
				if (shift1 != shift2) {
					int diff = Math.abs(stats.getShiftCounts().get(shift1) -
						stats.getShiftCounts().get(shift2));
					if (diff > 2) {
						penalty += Math.pow(diff - 2, 2) * 150;
					}
				}
			}
		}

		// 4. 야간 근무의 경우 연속성 부족에 대한 패널티
		if (proposedShift == Shift.N && stats.getLastShift() != Shift.N &&
			stats.getConsecutiveNights() == 0) {
			penalty += 300;
		}

		// 5. 야간 근무 관련 패널티 강화
		if (proposedShift == Shift.N) {
			if (stats.getConsecutiveNights() < rule.getMinN() - 1) {
				// 최소 연속일수 미만일 때는 패널티 감소 (연속 근무 유도)
				penalty -= 500;
			} else if (stats.getConsecutiveNights() >= rule.getMinN()) {
				// 최소 연속일수 만족 후에는 패널티 증가 (다른 간호사에게 기회 제공)
				penalty += Math.pow(stats.getConsecutiveNights() - rule.getMinN() + 1, 2) * 50;
			}
		} else if (stats.getLastShift() == Shift.N && stats.getConsecutiveNights() < rule.getMinN()) {
			// 최소 연속 야간 근무 일수를 채우기 전에 다른 근무로 변경하려는 경우
			penalty += 2000;
		}

		return penalty;
	}

	//특정 패턴을 금지 시키는 메서드
	private boolean isValidAssignment(Long memberId, int day, Shift proposedShift,
		Map<Long, MemberStats> memberStatsMap, Rule rule) {
		MemberStats stats = memberStatsMap.get(memberId);
		if (stats.getLastShift() != null) {
			// N -> D/E 불가
			if (stats.getLastShift() == Shift.N &&
				(proposedShift == Shift.D || proposedShift == Shift.E)) {
				return false;
			}
			// E -> D 불가
			if (stats.getLastShift() == Shift.E && proposedShift == Shift.D) {
				return false;
			}
			// 최대 연속 근무 체크
			if (proposedShift != Shift.O && proposedShift != Shift.X &&
				stats.getConsecutiveWorkDays() >= rule.getMaxShift()) {
				return false;
			}

			// // 야간 근무 관련 규칙
			// // 야간 근무 관련 규칙
			// if (proposedShift == Shift.N) {
			// 	// 최대 연속 야간 제한
			// 	if (stats.getLastShift() == Shift.N &&
			// 		stats.getConsecutiveNights() >= rule.getMaxN()) {
			// 		return false;
			// 	}
			// } else {
			// 	// 야간 근무 중 다른 근무로 변경 시도할 때
			// 	// 현재 연속 야간 근무가 최소 일수를 만족하지 않으면 불가
			// 	if (stats.getLastShift() == Shift.N &&
			// 		stats.getConsecutiveNights() < rule.getMinN()) {
			// 		return false;
			// 	}
			// }
		}

		return true;
	}

	/**
	 * 이전 달의 근무 기록을 처리합니다.
	 */
	private Map<Long, String> processPreviousShifts(List<WardSchedule.NurseShift> prevNurseShifts) {
		Map<Long, String> prevShiftsMap = new HashMap<>();

		if (prevNurseShifts == null || prevNurseShifts.isEmpty()) {
			return prevShiftsMap;
		}

		for (WardSchedule.NurseShift prevShift : prevNurseShifts) {
			String shifts = prevShift.getShifts();
			if (shifts != null && shifts.length() >= PREV_SHIFTS_LENGTH) {
				String lastShifts = shifts.substring(shifts.length() - PREV_SHIFTS_LENGTH)
					.replace('X', 'O');
				prevShiftsMap.put(prevShift.getMemberId(), lastShifts);
			} else {
				prevShiftsMap.put(prevShift.getMemberId(), DEFAULT_PREV_SHIFTS);
			}
		}

		return prevShiftsMap;
	}

	//체크용 메서드

	/**
	 * 일별 근무 인원을 확인하는 메서드
	 * @param duty 검사할 근무표
	 * @return 일자별 근무 유형 인원 맵 (key: 일자, value: 근무유형별 인원 맵)
	 */
	public Map<Integer, Map<Shift, Integer>> checkDailyAssignmentCounts(WardSchedule.Duty duty) {
		Map<Integer, Map<Shift, Integer>> dailyCounts = new HashMap<>();

		// 근무표의 첫 번째 데이터로부터 날짜 수 확인
		int daysInMonth = duty.getDuty().get(0).getShifts().length();

		// 일별 카운트 초기화
		for (int day = 1; day <= daysInMonth; day++) {
			Map<Shift, Integer> shiftCounts = new HashMap<>();
			for (Shift shift : Shift.values()) {
				shiftCounts.put(shift, 0);
			}
			dailyCounts.put(day, shiftCounts);
		}

		// 각 간호사의 근무를 일별로 카운트
		for (WardSchedule.NurseShift nurseShift : duty.getDuty()) {
			String shifts = nurseShift.getShifts();
			for (int day = 1; day <= shifts.length(); day++) {
				Shift shift = Shift.valueOf(String.valueOf(shifts.charAt(day - 1)));
				dailyCounts.get(day).merge(shift, 1, Integer::sum);
			}
		}

		return dailyCounts;
	}

	/**
	 * 간호사별 근무 유형 횟수를 확인하는 메서드
	 * @param duty 검사할 근무표
	 * @return 간호사별 근무유형 횟수 맵 (key: 간호사ID, value: 근무유형별 횟수 맵)
	 */
	public Map<Long, Map<Shift, Integer>> checkNurseShiftCounts(WardSchedule.Duty duty) {
		Map<Long, Map<Shift, Integer>> nurseCounts = new HashMap<>();

		// 각 간호사별 근무 횟수 계산
		for (WardSchedule.NurseShift nurseShift : duty.getDuty()) {
			Long memberId = nurseShift.getMemberId();
			Map<Shift, Integer> shiftCounts = new HashMap<>();

			// 근무 유형별 카운트 초기화
			for (Shift shift : Shift.values()) {
				shiftCounts.put(shift, 0);
			}

			// 근무 문자열에서 각 근무 유형 카운트
			String shifts = nurseShift.getShifts();
			for (char c : shifts.toCharArray()) {
				Shift shift = Shift.valueOf(String.valueOf(c));
				shiftCounts.merge(shift, 1, Integer::sum);
			}

			nurseCounts.put(memberId, shiftCounts);
		}

		return nurseCounts;
	}

	/**
	 * 생성된 근무표의 통계를 출력하는 메서드
	 * @param duty 검사할 근무표
	 * @param wardMembers 병동 멤버 리스트 (간호사 이름 출력용)
	 */
	public void printScheduleStatistics(WardSchedule.Duty duty, List<WardMember> wardMembers) {
		Map<Integer, Map<Shift, Integer>> dailyCounts = checkDailyAssignmentCounts(duty);
		Map<Long, Map<Shift, Integer>> nurseCounts = checkNurseShiftCounts(duty);

		// 멤버 ID to 이름 매핑
		Map<Long, String> memberNames = wardMembers.stream()
			.collect(Collectors.toMap(
				wm -> wm.getMember().getMemberId(),
				wm -> wm.getMember().getName()
			));

		System.out.println("\n=== 일별 근무 인원 ===");
		dailyCounts.forEach((day, counts) -> {
			System.out.printf("Day %2d: ", day);
			counts.forEach((shift, count) ->
				System.out.printf("%s:%d ", shift, count));
			System.out.println();
		});

		System.out.println("\n=== 간호사별 근무 횟수 ===");
		nurseCounts.forEach((memberId, counts) -> {
			System.out.printf("%s: ", memberNames.get(memberId));
			counts.forEach((shift, count) ->
				System.out.printf("%s:%d ", shift, count));
			System.out.println();
		});
	}
}

