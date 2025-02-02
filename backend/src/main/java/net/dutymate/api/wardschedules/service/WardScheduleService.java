package net.dutymate.api.wardschedules.service;

import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import net.dutymate.api.entity.Member;
import net.dutymate.api.entity.Ward;
import net.dutymate.api.member.repository.MemberRepository;
import net.dutymate.api.wardschedules.collections.WardSchedule;
import net.dutymate.api.wardschedules.dto.WardScheduleResponseDto;
import net.dutymate.api.wardschedules.repository.WardScheduleRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WardScheduleService {

	private final MemberRepository memberRepository;
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

	@Transactional
	public WardScheduleResponseDto getWardSchedule(Member member, final Integer year, final Integer month) {
		// 현재 달의 일 수 계산 (28, 29, 30, 31일 중)
		int daysInMonth = YearMonth.of(year, month).lengthOfMonth();
		String initializedShifts = "X".repeat(daysInMonth);

		// 이전 연, 월 초기화
		int prevYear = year;
		int prevMonth = month - 1;
		if (prevMonth == 0) {
			prevYear--;
			prevMonth = 12;
		}

		// 현재 속한 병동 정보 가져오기
		if (member.getWardMember() == null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "병동에 속해있지 않는 회원입니다.");
		}
		Ward ward = member.getWardMember().getWard();

		// 몽고 DB에서 병동 스케줄 가져오기
		WardSchedule wardSchedule =
			wardScheduleRepository.findByWardIdAndYearAndMonth(ward.getWardId(), year, month)
				.orElseGet(() -> {
					// 이번달 듀티표가 없으면 새로 생성하기
					WardSchedule.Duty duty = WardSchedule.Duty.builder()
						.duty(new ArrayList<>())
						.build();
					// 병동 소속 간호사 모두 넣기
					ward.getWardMemberList()
						.forEach(nurse -> duty.addNurseShift(WardSchedule.NurseShift.builder()
							.memberId(nurse.getMember().getMemberId())
							.shifts(initializedShifts)
							.build()));
					// 병동 스케줄 도큐먼트 만들기
					WardSchedule newWardSchedule = WardSchedule.builder()
						.wardId(ward.getWardId())
						.year(year)
						.month(month)
						.duties(List.of(duty))
						.build();

					wardScheduleRepository.save(newWardSchedule);
					return newWardSchedule;
				});

		// 몽고 DB에서 전달 병동 스케줄 가져오기
		WardSchedule prevWardSchedule =
			wardScheduleRepository.findByWardIdAndYearAndMonth(ward.getWardId(), prevYear, prevMonth)
				.orElse(null);

		// 이번달 듀티표 가져오기
		List<WardSchedule.NurseShift> recentNurseShifts = wardSchedule.getDuties().getLast().getDuty();
		// 전달 듀티표 가져오기
		List<WardSchedule.NurseShift> prevNurseShifts;
		if (prevWardSchedule != null) {
			prevNurseShifts = prevWardSchedule.getDuties().getLast().getDuty();
		} else {
			prevNurseShifts = null;
		}

		// recentNurseShifts -> DTO 변환
		List<WardScheduleResponseDto.NurseShifts> nurseShiftsDto = recentNurseShifts.stream()
			.map(WardScheduleResponseDto.NurseShifts::of)
			.toList();

		// DTO에 값 넣어주기
		nurseShiftsDto.forEach(now -> {
			Member nurse = memberRepository.findById(now.getMemberId())
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "간호사 매핑 오류"));
			now.setName(nurse.getName());
			now.setRole(nurse.getRole());

			// prevShifts 구하기
			if (prevNurseShifts == null) {
				now.setPrevShifts("XXXX");
			} else {
				WardSchedule.NurseShift prevShifts = prevNurseShifts.stream()
					.filter(prev -> Objects.equals(prev.getMemberId(), nurse.getMemberId()))
					.findAny()
					.orElseGet(() -> WardSchedule.NurseShift.builder().shifts("XXXX").build());
				now.setPrevShifts(prevShifts.getShifts().substring(prevShifts.getShifts().length() - 4));
			}
		});

		// TODO invalidCnt 구하기
		// int invalidCnt = calcInvalidCnt(recentNurseShifts);

		// TODO history 구하기
		// TODO Issues 구하기

		return WardScheduleResponseDto.of(wardSchedule.getId(), year, month, 0, nurseShiftsDto);
	}

	/**
	 * duties 추가 API (PUT 요청)
	 */
}
