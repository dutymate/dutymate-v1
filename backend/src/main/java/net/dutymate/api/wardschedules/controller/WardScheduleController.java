package net.dutymate.api.wardschedules.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/duty")
@RequiredArgsConstructor
public class WardScheduleController {

	// private final WardScheduleService wardScheduleService;

	// @GetMapping
	// public ResponseEntity<List<WardSchedule>> getWardSchedules(@RequestParam int year, @RequestParam int month) {
	// 	// TODO 로그인인 member의 token을 까서 -> wardId 찾기
	// 	// TODO 또는, 처음 생성되는 병동의 경우, 해당 wardId 사용
	//
	// 	WardSchedule schedule = wardScheduleService.getOrCreateWardSchedule(wardId, year, month);
	//
	// 	return ResponseEntity.ok(schedule);
	// }
}
