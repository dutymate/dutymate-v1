package net.dutymate.api.wardschedules.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import net.dutymate.api.wardschedules.collections.WardSchedule;

public interface WardScheduleRepository
	extends MongoRepository<WardSchedule, String> {

	Boolean existsByWardIdAndYearAndMonth(Long wardId, int year, int month);

	Optional<WardSchedule> findByWardIdAndYearAndMonth(Long wardId, int year, int month);

	List<WardSchedule> findAllByWardIdAndYearAndMonth(Long wardId, int year, int month);

}
