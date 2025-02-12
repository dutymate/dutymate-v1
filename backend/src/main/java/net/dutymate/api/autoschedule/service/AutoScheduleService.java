package net.dutymate.api.autoschedule.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import net.dutymate.api.autoschedule.util.ScheduleGenerator;
import net.dutymate.api.entity.Member;
import net.dutymate.api.entity.Rule;
import net.dutymate.api.entity.WardMember;
import net.dutymate.api.member.repository.MemberRepository;
import net.dutymate.api.member.service.MemberService;
import net.dutymate.api.records.YearMonth;
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

	private final ScheduleGenerator scheduleGenerator;

	@Transactional
	public ResponseEntity<String> generateAutoSchedule(YearMonth yearMonth, Member member) {

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
			< scheduleGenerator.neededNurseCount(yearMonth, rule)) {
			return ResponseEntity.badRequest().body("현재 근무 일정에는 간호사가 더 필요합니다.");
		}
		scheduleGenerator.generateSchedule(wardSchedule, rule, wardMembers, prevNurseShifts, yearMonth);
		wardScheduleRepository.save(wardSchedule);

		return ResponseEntity.ok("자동 생성 완료");
	}
}
