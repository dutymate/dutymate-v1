package net.dutymate.api.entity;

import java.util.ArrayList;
import java.util.List;

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
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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
}
