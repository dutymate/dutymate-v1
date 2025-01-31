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

	private String iss;
	private String azp;
	private String aud;
	private String sub;
	private String email;
	private boolean emailVerified;
	private String atHash;
	private String name;
	private String picture;
	private String givenName;
	private String familyName;
	private long iat;
	private long exp;
	private String alg;
	private String kid;
	private String typ;

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
