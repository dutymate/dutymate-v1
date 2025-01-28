package net.dutymate.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Ward {

	@Id
	@Column(name = "ward_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long wardId;

	// for Rule Entity
	//    @OneToOne(fetch = FetchType.LAZY, optional = false)
	//    @JoinColumn(name = "rule_id", nullable = false, unique = true)
	//    private Rule rule;

	@Column(name = "ward_code", length = 6)
	private String wardCode;

	@Column(name = "ward_name", length = 20)
	private String wardName;

	@Column(name = "hospital_name", length = 50)
	private String hospitalName;

	@Column(length = 50)
	private String uuid;
}
