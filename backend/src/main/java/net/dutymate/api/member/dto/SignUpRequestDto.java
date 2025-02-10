package net.dutymate.api.member.dto;

import org.mindrot.jbcrypt.BCrypt;

import net.dutymate.api.entity.Member;
import net.dutymate.api.enumclass.Provider;

import lombok.Data;

@Data
public class SignUpRequestDto {

	private String email;
	private String password;
	private String passwordConfirm;
	private String name;

	public Member toMember(String defaultProfileImg) {
		return Member.builder()
			.email(email)
			.password(BCrypt.hashpw(password, BCrypt.gensalt()))
			.name(name)
			.provider(Provider.NONE)
			.profileImg(defaultProfileImg)
			.build();
	}

	public LoginRequestDto toLoginRequestDto() {
		return LoginRequestDto.builder()
			.email(email)
			.password(password)
			.build();
	}
}
