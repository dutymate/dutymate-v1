package net.dutymate.api.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
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
public class Ward {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long wardId;

	// OneToMany => Ward : WardMember = 1 : N
	@OneToMany(mappedBy = "ward", cascade = CascadeType.ALL)
	private List<WardMember> wardMemberList = new ArrayList<>();

	// OneToOne => Ward : Rule = 1 : 1
	@OneToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.ALL)
	@JoinColumn(name = "rule_id", nullable = false, unique = true)
	private Rule rule;

	@Column(length = 6)
	private String wardCode;

	@Column(length = 20)
	private String wardName;

	@Column(length = 50)
	private String hospitalName;

	@Column(length = 50, unique = true)
	private String uuid;

	/**
	 * 엔티티에 저장되기 전에 wardCode와 UUID 자동 생성
	 */
	@PrePersist
	protected void onCreate() {
		this.uuid = UUID.randomUUID().toString(); // 자동 UUID 생성
		this.wardCode = generateWardCode(); // 랜덤 6자리 코드 생성

		// 1 : 1 관계인 rule이 ward 생성 시, 자동으로 생성되도록 설정
		if (this.rule == null) {
			this.rule = Rule.createDefaultRule();
		}
		this.wardMemberList = new ArrayList<>();
	}

	// wardCode : 랜덤한 6자리 대문자 + 숫자 조합 코드 생성
	private String generateWardCode() {
		Random random = new Random();
		StringBuilder code = new StringBuilder();
		String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		for (int i = 0; i < 6; i++) {
			code.append(characters.charAt(random.nextInt(characters.length())));
		}
		return code.toString();
	}

	// Ward 생성하는 사람을 첫 번째 병동 멤버로 추가
	public void addWardMember(WardMember wardMember) {
		this.wardMemberList.add(wardMember);
	}
}
