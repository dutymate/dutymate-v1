package net.dutymate.api.member.dto;

import java.sql.Timestamp;

import net.dutymate.api.entity.Member;
import net.dutymate.api.enumclass.Provider;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.Data;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class GoogleUserResponseDto {

	private String email;
	private String name;
	private String picture;

	// GoogleUser(DTO) -> Member Entity
	public Member toMember() {
		return Member.builder()
			.email(email)
			.password("GooglePassword123!!")
			.name(name)
			.profileImg(picture)
			.provider(Provider.GOOGLE)
			.createdAt(new Timestamp(System.currentTimeMillis()))
			.build();
	}
}
