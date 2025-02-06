package net.dutymate.api.wardschedules.util;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import net.dutymate.api.entity.Ward;
import net.dutymate.api.entity.WardMember;
import net.dutymate.api.records.YearMonth;
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
	public void initializedDuty(WardMember wardMember, YearMonth yearMonth) {
		createNewWardSchedule(wardMember.getWard(), List.of(wardMember), yearMonth);
	}

	/**
	 * 새로운 WardSchedule 생성 (병동 생성 시)
	 */
	public WardSchedule createNewWardSchedule(Ward ward, List<WardMember> wardMemberList, YearMonth yearMonth) {

		WardSchedule.Duty duty = WardSchedule.Duty.builder()
			.duty(new ArrayList<>())
			.build();

		wardMemberList.forEach(nurse -> duty.addNurseShift(
			createNurseShift(nurse, yearMonth.initializeShifts())));

		WardSchedule newSchedule = WardSchedule.builder()
			.wardId(ward.getWardId())
			.year(yearMonth.year())
			.month(yearMonth.month())
			.duties(List.of(duty)) // 초기 duty 리스트 추가
			.build();

		// mongodb 저장
		return wardScheduleRepository.save(newSchedule);
	}

	/**
	 * 기존 스케줄에 새로운 멤버 추가하여 새 스냅샷 생성 (병동 입장 시)
	 */
	public void updateDutyWithNewMember(WardSchedule existingSchedule, WardMember newWardMember) {

		String initializedShifts
			= new YearMonth(existingSchedule.getYear(), existingSchedule.getMonth()).initializeShifts();

		WardSchedule.NurseShift nurseShift = createNurseShift(newWardMember, initializedShifts);

		// 1. 기존의 duty 마지막에 새로운 멤버 추가
		WardSchedule.Duty lastDuty =
			existingSchedule.getDuties().isEmpty()
				? WardSchedule.Duty.builder().duty(new ArrayList<>()).build()
				: existingSchedule.getDuties().getLast();

		// 2. 마지막 duty에 새로운 멤버 초기화된 값 추가
		lastDuty.addNurseShift(nurseShift);

		// 3. 기존 duties 초기화 후, 새 멤버 추가된 duty 추가하기
		WardSchedule updatedSchedule = WardSchedule.builder()
			.id(existingSchedule.getId())
			.wardId(newWardMember.getWard().getWardId())
			.year(existingSchedule.getYear())
			.month(existingSchedule.getMonth())
			.duties(new ArrayList<>(List.of(lastDuty)))
			.build();

		// mongodb 저장
		wardScheduleRepository.save(updatedSchedule);
	}

	// 초기 duty 생성을 위한 NurseShift 생성 메서드
	public WardSchedule.NurseShift createNurseShift(WardMember wardMember, String initializedShifts) {

		return WardSchedule.NurseShift.builder()
			.memberId(wardMember.getMember().getMemberId())
			.shifts(initializedShifts)
			.build();
	}
}
