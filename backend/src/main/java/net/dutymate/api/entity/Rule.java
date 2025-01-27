package net.dutymate.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

	@Builder
	public Rule(Integer wdayDCnt, Integer wdayECnt, Integer wdayNCnt,
		Integer wendDCnt, Integer wendECnt, Integer wendNCnt,
		Integer maxN, Integer prioMaxN, Integer minN, Integer prioMinN,
		Integer offCntAfterN, Integer prioOffCntAfterN,
		Integer maxShift, Integer prioMaxShift,
		Integer offCntAfterMaxShift, Integer prioOffCntAfterMaxShift) {
		this.wdayDCnt = wdayDCnt;
		this.wdayECnt = wdayECnt;
		this.wdayNCnt = wdayNCnt;
		this.wendDCnt = wendDCnt;
		this.wendECnt = wendECnt;
		this.wendNCnt = wendNCnt;
		this.maxN = maxN;
		this.prioMaxN = prioMaxN;
		this.minN = minN;
		this.prioMinN = prioMinN;
		this.offCntAfterN = offCntAfterN;
		this.prioOffCntAfterN = prioOffCntAfterN;
		this.maxShift = maxShift;
		this.prioMaxShift = prioMaxShift;
		this.offCntAfterMaxShift = offCntAfterMaxShift;
		this.prioOffCntAfterMaxShift = prioOffCntAfterMaxShift;
	}
}
