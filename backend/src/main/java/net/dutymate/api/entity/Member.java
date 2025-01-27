package net.dutymate.api.entity;

import java.sql.Timestamp;

import org.hibernate.annotations.ColumnDefault;

import net.dutymate.api.enumclass.Gender;
import net.dutymate.api.enumclass.Provider;
import net.dutymate.api.enumclass.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long memberId;

	@Column(length = 45, updatable = false, nullable = false)
	private String email;

	@Column(nullable = false)
	private String password;

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

	@Column(columnDefinition = "TINYINT(1)", nullable = false)
	@ColumnDefault("true")
	private Boolean isActive;
}
