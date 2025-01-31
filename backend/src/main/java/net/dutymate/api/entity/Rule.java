package net.dutymate.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Rule {

	@Id
	@Column(name = "rule_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ruleId;

	@Column(name = "wday_d_cnt")
	private Integer wdayDCnt;

	@Column(name = "wday_e_cnt")
	private Integer wdayECnt;

	@Column(name = "wday_n_cnt")
	private Integer wdayNCnt;

	@Column(name = "wend_d_cnt")
	private Integer wendDCnt;

	@Column(name = "wend_e_cnt")
	private Integer wendECnt;

	@Column(name = "wend_n_cnt")
	private Integer wendNCnt;

	@Column(name = "max_n")
	private Integer maxN;

	@Column(name = "prio_max_n")
	private Integer prioMaxN;

	@Column(name = "min_n")
	private Integer minN;

	@Column(name = "prio_min_n")
	private Integer prioMinN;

	@Column(name = "off_cnt_after_n")
	private Integer offCntAfterN;

	@Column(name = "prio_off_cnt_after_n")
	private Integer prioOffCntAfterN;

	@Column(name = "max_shift")
	private Integer maxShift;

	@Column(name = "prio_max_shift")
	private Integer prioMaxShift;

	@Column(name = "off_cnt_after_max_shift")
	private Integer offCntAfterMaxShift;

	@Column(name = "prio_off_cnt_after_max_shift")
	private Integer prioOffCntAfterMaxShift;

	// 기본값이 설정된 Builder
	public static Rule createDefaultRule() {
		return Rule.builder()
			.wdayDCnt(3)
			.wdayECnt(2)
			.wdayNCnt(2)
			.wendDCnt(2)
			.wendECnt(2)
			.wendNCnt(2)
			.maxN(3)
			.prioMaxN(3)
			.minN(2)
			.prioMinN(3)
			.offCntAfterN(2)
			.prioOffCntAfterN(2)
			.maxShift(5)
			.prioMaxShift(3)
			.offCntAfterMaxShift(2)
			.prioOffCntAfterMaxShift(2)
			.build();
	}
}
