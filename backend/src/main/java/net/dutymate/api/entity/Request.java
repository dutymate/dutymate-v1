package net.dutymate.api.entity;

import java.sql.Date;
import java.sql.Timestamp;

import net.dutymate.api.enumclass.RequestStatus;
import net.dutymate.api.enumclass.Shift;

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
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Request {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long requestId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ward_member_id", nullable = false)
	private WardMember wardMember;

	@Column(name = "request_date")
	private Date requestDate;

	@Enumerated(EnumType.STRING)
	@Column(name = "request_shift")
	private Shift requestShift;

	@Column(name = "created_at")
	private Timestamp createdAt;

	@Column(name = "memo", length = 1000)
	private String memo;

	@Enumerated(EnumType.STRING)
	@Column(name = "status")
	private RequestStatus status;
}
