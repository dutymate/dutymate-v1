package net.dutymate.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
public class WardMember {

	@Id
	@Column(name = "ward_member_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long wardMemberId;
}
