package net.dutymate.api.wardSchedules.service;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.stereotype.Service;

import net.dutymate.api.wardSchedules.document.WardSchedule;
import net.dutymate.api.wardSchedules.repository.WardScheduleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WardScheduleService {
	private final WardScheduleRepository wardScheduleRepository;

	/**
	 * 초기 wardId, year, month에 해당하는 데이터가 없으면,
	 * 초기화한 duties mongodb에 저장하기
	 */
	public WardSchedule getOrCreateWardSchedule(Long wardId, int year, int month) {
		Optional<WardSchedule> existingWardSchedule = wardScheduleRepository.findByWardIdAndYearAndMonth(wardId, year,
			month);

		return existingWardSchedule.orElseGet(() -> {
			WardSchedule newWardSchedule = new WardSchedule();
			newWardSchedule.setWardId(wardId);
			newWardSchedule.setYear(year);
			newWardSchedule.setMonth(month);
			newWardSchedule.setDuties(new ArrayList<>()); // 초기 duties 리스트
			return wardScheduleRepository.save(newWardSchedule);
		});
	}
}
