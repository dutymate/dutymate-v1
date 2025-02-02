package net.dutymate.api.wardschedules.controller;

import java.time.LocalDate;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.dutymate.api.annotation.Auth;
import net.dutymate.api.entity.Member;
import net.dutymate.api.wardschedules.dto.WardScheduleResponseDto;
import net.dutymate.api.wardschedules.service.WardScheduleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/duty")
@RequiredArgsConstructor
public class WardScheduleController {

	private final WardScheduleService wardScheduleService;

	// @GetMapping
	// public ResponseEntity<List<WardSchedule>> getWardSchedules(@RequestParam int year, @RequestParam int month) {
	// 	// TODO 로그인인 member의 token을 까서 -> wardId 찾기
	// 	// TODO 또는, 처음 생성되는 병동의 경우, 해당 wardId 사용
	//
	// 	WardSchedule schedule = wardScheduleService.getOrCreateWardSchedule(wardId, year, month);
	//
	// 	return ResponseEntity.ok(schedule);
	// }

	@GetMapping
	public ResponseEntity<?> getWardSchedule(
		@Auth Member member,
		@RequestParam(required = false) Integer year,
		@RequestParam(required = false) Integer month) {

		// 현재 연, 월 초기화
		if (year == null || month == null) {
			year = LocalDate.now().getYear();
			month = LocalDate.now().getMonthValue();
		}
		WardScheduleResponseDto wardScheduleResponseDto = wardScheduleService.getWardSchedule(member, year, month);
		return ResponseEntity.ok(wardScheduleResponseDto);
	}
}
