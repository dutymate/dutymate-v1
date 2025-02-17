package net.dutymate.api.autoschedule.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import net.dutymate.api.autoschedule.util.NurseScheduler;
import net.dutymate.api.entity.Member;
import net.dutymate.api.entity.Request;
import net.dutymate.api.entity.Rule;
import net.dutymate.api.entity.WardMember;
import net.dutymate.api.member.repository.MemberRepository;
import net.dutymate.api.member.service.MemberService;
import net.dutymate.api.records.YearMonth;
import net.dutymate.api.request.repository.RequestRepository;
import net.dutymate.api.request.util.UpdateRequestStatuses;
import net.dutymate.api.rule.repository.RuleRepository;
import net.dutymate.api.rule.service.RuleService;
import net.dutymate.api.ward.repository.WardRepository;
import net.dutymate.api.ward.service.WardService;
import net.dutymate.api.wardmember.repository.WardMemberRepository;
import net.dutymate.api.wardmember.service.WardMemberService;
import net.dutymate.api.wardschedules.collections.WardSchedule;
import net.dutymate.api.wardschedules.repository.WardScheduleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AutoScheduleService {

	private final MemberService memberService;
	private final WardMemberService wardMemberService;
	private final WardService wardService;
	private final RuleService ruleService;

	private final WardMemberRepository wardMemberRepository;
	private final MemberRepository memberRepository;
	private final WardRepository wardRepository;
	private final RuleRepository ruleRepository;

	private final WardScheduleRepository wardScheduleRepository;
	private final RequestRepository requestRepository;

	private final UpdateRequestStatuses updateRequestStatuses;
	private final NurseScheduler nurseScheduler;

	@Transactional
	public ResponseEntity<?> generateAutoSchedule(YearMonth yearMonth, Member member) {

		Long wardId = member.getWardMember().getWard().getWardId();
		//전월 달 근무 호출
		YearMonth prevYearMonth = yearMonth.prevYearMonth();
		WardSchedule prevWardSchedule = wardScheduleRepository
			.findByWardIdAndYearAndMonth(wardId, prevYearMonth.year(), prevYearMonth.month())
			.orElse(null);
		// 전달 듀티표 가져오기
		List<WardSchedule.NurseShift> prevNurseShifts;
		if (prevWardSchedule != null) {
			prevNurseShifts = prevWardSchedule.getDuties().get(prevWardSchedule.getNowIdx()).getDuty();
		} else {
			prevNurseShifts = null;
		}

		Rule rule = member.getWardMember().getWard().getRule();
		List<WardMember> wardMembers = wardMemberRepository.findAllByWard(member.getWardMember().getWard());
		WardSchedule wardSchedule = wardScheduleRepository.findByWardIdAndYearAndMonth(wardId, yearMonth.year(),
				yearMonth.month())
			.orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "근무 일정을 찾을 수 없습니다."));

		if (wardSchedule.getDuties().get(wardSchedule.getNowIdx()).getDuty().size()
			< nurseScheduler.neededNurseCount(yearMonth, rule)) {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE)
				.body("간호사가 더 필요합니다.");
		}

		// scheduleGenerator.generateSchedule(wardSchedule, rule, wardMembers, prevNurseShifts, yearMonth);
		Long memberId = member.getMemberId();

		List<Request> requests = requestRepository.findAllWardRequests(member.getWardMember().getWard());
		WardSchedule updateWardSchedule = nurseScheduler.generateSchedule(wardSchedule, rule, wardMembers,
			prevNurseShifts, yearMonth, memberId,
			requests);

		List<WardSchedule.NurseShift> originalShifts = wardSchedule.getDuties().get(wardSchedule.getNowIdx()).getDuty();
		List<WardSchedule.NurseShift> updatedShifts = updateWardSchedule.getDuties()
			.get(updateWardSchedule.getNowIdx())
			.getDuty();
		boolean isChanged = false;
		for (int nurseCnt = 0; nurseCnt < originalShifts.size(); nurseCnt++) {
			if (!originalShifts.get(nurseCnt).getShifts().equals(
				updatedShifts.get(nurseCnt).getShifts()
			)) {
				isChanged = true;
				break;
			}
		}

		//요청 상태 관리
		updateRequestStatuses.updateRequestStatuses(requests, updateWardSchedule, yearMonth);

		wardScheduleRepository.save(updateWardSchedule);

		if (!isChanged) {
			return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED)
				.body("모든 조건을 만족하는 최적의 근무표입니다");
		}
		return ResponseEntity.ok("자동 생성 완료");
	}

}
