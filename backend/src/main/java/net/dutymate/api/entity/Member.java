package net.dutymate.api.entity;

import java.sql.Timestamp;

import net.dutymate.api.enumclass.Gender;
import net.dutymate.api.enumclass.Provider;
import net.dutymate.api.enumclass.Role;
import net.dutymate.api.member.util.NicknameGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class Member {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long memberId;

	@Column(length = 45, updatable = false, nullable = false)
	private String email;

	@Column(nullable = false)
	private String password;

	@Column(length = 10, nullable = false)
	private String name;

	@Column(length = 10, nullable = false)
	private String nickname;

	@Enumerated(EnumType.STRING)
	private Gender gender;

	@Enumerated(EnumType.STRING)
	private Role role;

	private Integer grade;

	@Enumerated(EnumType.STRING)
	private Provider provider;

	private String profileImg;

	@Column(nullable = false, updatable = false)
	private Timestamp createdAt;

	@Column(columnDefinition = "tinyint(1)", nullable = false)
	private Boolean isActive;

	// 멤버 초기값 설정 (닉네임, 생성시각, 활성화여부)
	@PrePersist
	public void prePersist() {
		this.nickname = NicknameGenerator.generateNickname();
		this.createdAt = new Timestamp(System.currentTimeMillis());
		this.isActive = true;
	}

	public void changeAdditionalInfo(Integer grade, Gender gender, Role role) {
		this.grade = grade;
		this.gender = gender;
		this.role = role;
	}
}
