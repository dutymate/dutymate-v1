package net.dutymate.api.wardschedules.service;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.stereotype.Service;

import net.dutymate.api.wardschedules.collection.WardSchedule;
import net.dutymate.api.wardschedules.repository.WardScheduleRepository;

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
			WardSchedule newWardSchedule = WardSchedule.builder()
				.wardId(wardId)
				.year(year)
				.month(month)
				.duties(new ArrayList<>()) // 초기 duties 리스트
				.build();
			return wardScheduleRepository.save(newWardSchedule);
		});
	}

	/**
	 * duties 추가 API (PUT 요청)
	 */
}
