package net.dutymate.api.wardSchedules.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import net.dutymate.api.wardSchedules.document.WardSchedule;

public interface WardScheduleRepository
	extends MongoRepository<WardSchedule, String> {
	Optional<WardSchedule> findByWardIdAndYearAndMonth(Long wardId, int year, int month);
}
