package net.dutymate.api.entity;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.ColumnDefault;

import net.dutymate.api.enumclass.ShiftType;
import net.dutymate.api.enumclass.SkillLevel;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WardMember {

	@Id
	@Column(name = "ward_member_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long wardMemberId;

	// ManyToOne => wardMember : Ward = N : 1
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "ward_id", nullable = false)
	private Ward ward;

	// OneToOne => WardMember : Member = 1 : 1
	// @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	// @JoinColumn(name = "member_id", nullable = false, unique = true)
	// private Member member;

	// OneToMany => wardMember : Request = 1 : N
	@OneToMany(mappedBy = "wardMember", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Request> requestList = new ArrayList<>();

	@Enumerated(EnumType.STRING)
	@Column(name = "shift")
	private ShiftType shiftType;

	@Column(length = 200)
	private String memo;

	@Column(length = 45)
	private String tempName;

	@Enumerated(EnumType.STRING)
	private SkillLevel skillLevel;

	@Column(columnDefinition = "TINYINT(1)", nullable = false)
	@ColumnDefault("false")
	private Boolean isSynced;
}
