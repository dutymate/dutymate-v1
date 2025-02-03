package net.dutymate.api.wardschedules.util;

import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import net.dutymate.api.entity.WardMember;
import net.dutymate.api.wardschedules.collections.WardSchedule;
import net.dutymate.api.wardschedules.repository.WardScheduleRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class InitialDutyGenerator {

	private final WardScheduleRepository wardScheduleRepository;

	/**
	 * Duty 초기화 메서드 (병동 생성 시에만 사용)
	 */
	public void initalizeDuty(WardMember wardMember, int year, int month) {

		// 1. 현재 달의 일 수 계산 (28, 29, 30, 31일 중)
		int daysInMonth = YearMonth.of(year, month).lengthOfMonth();

		// 2. shifts를 해당 달의 날짜 수 만큼 'X'로 초기화
		String initializedShifts = "X".repeat(daysInMonth);

		// 3. 멤버 한 명의 초기 Duty 생성
		WardSchedule.NurseShift nurseShift = createNurseShift(wardMember, initializedShifts);
		createNewWardSchedule(wardMember, nurseShift, year, month);
	}

	/**
	 * 새로운 WardSchedule 생성 (병동 생성 시)
	 */
	public void createNewWardSchedule(WardMember wardMember, WardSchedule.NurseShift nurseShift, int year, int month) {

		WardSchedule.Duty duty = WardSchedule.Duty.builder()
			.duty(new ArrayList<>())
			.build();

		duty.addNurseShift(nurseShift);

		WardSchedule newSchedule = WardSchedule.builder()
			.wardId(wardMember.getWard().getWardId())
			.year(year)
			.month(month)
			.duties(List.of(duty)) // 초기 duty 리스트 추가
			.build();

		// mongodb 저장
		wardScheduleRepository.save(newSchedule);
	}

	/**
	 * 기존 스케줄에 새로운 멤버 추가하여 새 스냅샷 생성 (병동 입장 시)
	 */
	public void createSnapshotWithAddNewMember(WardSchedule existingSchedule, WardMember newWardMember) {

		int daysInMonth = YearMonth.of(existingSchedule.getYear(), existingSchedule.getMonth()).lengthOfMonth();
		String initializedShifts = "X".repeat(daysInMonth);

		WardSchedule.NurseShift nurseShift = createNurseShift(newWardMember, initializedShifts);

		// 1. 기존의 Duty 복사 후, 새로운 멤버 추가
		List<WardSchedule.Duty> newDuties = new ArrayList<>(existingSchedule.getDuties());
		WardSchedule.Duty recentSchedule = newDuties.getLast();
		recentSchedule.addNurseShift(nurseShift);

		// 2. 새로운 스냅샷 생성
		WardSchedule snapshot = WardSchedule.builder()
			.wardId(existingSchedule.getWardId())
			.year(existingSchedule.getYear())
			.month(existingSchedule.getMonth())
			.duties(newDuties)
			.build();

		// mongodb 저장
		wardScheduleRepository.save(snapshot);
	}

	// 초기 duty 생성을 위한 NurseShift 생성 메서드
	private WardSchedule.NurseShift createNurseShift(WardMember wardMember, String initializedShifts) {

		return WardSchedule.NurseShift.builder()
			.memberId(wardMember.getMember().getMemberId())
			.shifts(initializedShifts)
			.build();
	}
}
