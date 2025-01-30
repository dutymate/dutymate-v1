package net.dutymate.api.member.service;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import net.dutymate.api.entity.Member;
import net.dutymate.api.enumclass.Gender;
import net.dutymate.api.enumclass.Role;
import net.dutymate.api.member.dto.AdditionalInfoRequestDto;
import net.dutymate.api.member.dto.AdditionalInfoResponseDto;
import net.dutymate.api.member.dto.KakaoTokenResponseDto;
import net.dutymate.api.member.dto.KakaoUserResponseDto;
import net.dutymate.api.member.dto.LoginResponseDto;
import net.dutymate.api.member.repository.MemberRepository;
import net.dutymate.api.member.util.JwtUtil;

import io.netty.handler.codec.http.HttpHeaderValues;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {

	private final MemberRepository memberRepository;
	private final JwtUtil jwtUtil;

	@Value("${kakao.client.id}")
	private String kakaoClientId;
	@Value("${kakao.token.uri}")
	private String kakaoTokenUri;
	@Value("${kakao.user.uri}")
	private String kakaoUserUri;
	@Value("${kakao.redirect.uri}")
	private String kakaoRedirectUri;

	@Transactional
	public LoginResponseDto kakaoLogin(String code) {
		// KAKAO로부터 토큰 발급받아 유저 정보 확인
		String kakaoAccessToken = getKakaoAccessToken(code);
		KakaoUserResponseDto.KakaoAccount kakaoAccount = getKakaoUserInfo(kakaoAccessToken);

		// 가입된 회원 엔티티를 조회. 회원 테이블에 없으면 회원가입 처리
		Member member = memberRepository.findMemberByEmail(kakaoAccount.getEmail())
			.orElseGet(() -> signUp(kakaoAccount));

		// memberId로 AccessToken 생성
		String accessToken = jwtUtil.createToken(member.getMemberId());

		boolean existAdditionalInfo =
			member.getGrade() != null && member.getGender() != null && member.getRole() != null;

		// TODO 병동 입장 여부 확인

		return LoginResponseDto.of(member, accessToken, existAdditionalInfo, false);
	}

	@Transactional
	public AdditionalInfoResponseDto addAdditionalInfo(Member member,
		AdditionalInfoRequestDto additionalInfoRequestDto) {
		// DTO -> 연차, 성별, 역할 가져오기
		Integer grade = additionalInfoRequestDto.getGrade();
		Gender gender = Gender.valueOf(additionalInfoRequestDto.getGender());
		Role role = Role.valueOf(additionalInfoRequestDto.getRole());

		// Member 엔티티 수정하기
		member.changeAdditionalInfo(grade, gender, role);
		return AdditionalInfoResponseDto.of(member);
	}

	// 인가 코드로 KAKAO로부터 액세스 토큰을 받아오는 메서드
	private String getKakaoAccessToken(String code) {
		// 요청 Param 설정
		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("grant_type", "authorization_code");
		params.add("client_id", kakaoClientId);
		params.add("redirect_uri", kakaoRedirectUri);
		params.add("code", code);

		// WebClient 인스턴스 생성 후 토큰 받기 POST 요청
		KakaoTokenResponseDto kakaoTokenResponseDto = WebClient.create().post()
			.uri(kakaoTokenUri)
			.body(BodyInserters.fromFormData(params))
			.header(HttpHeaders.CONTENT_TYPE, HttpHeaderValues.APPLICATION_X_WWW_FORM_URLENCODED.toString())
			.retrieve()
			.bodyToMono(KakaoTokenResponseDto.class)
			.block();
		return Objects.requireNonNull(kakaoTokenResponseDto).getAccessToken();
	}

	// 액세스 토큰으로 KAKAO로부터 사용자 정보를 가져오는 메서드
	public KakaoUserResponseDto.KakaoAccount getKakaoUserInfo(String kakaoAccessToken) {
		// WebClient 인스턴스 생성 후 사용자 정보 가져오기 GET 요청
		KakaoUserResponseDto kakaoUserResponseDto = WebClient.create().post()
			.uri(kakaoUserUri)
			.header(HttpHeaders.AUTHORIZATION, "Bearer " + kakaoAccessToken)
			.header(HttpHeaders.CONTENT_TYPE, HttpHeaderValues.APPLICATION_X_WWW_FORM_URLENCODED.toString())
			.retrieve()
			.bodyToMono(KakaoUserResponseDto.class)
			.block();
		return Objects.requireNonNull(kakaoUserResponseDto).getKakaoAccount();
	}

	// KAKAO 계정으로 회원가입
	private Member signUp(KakaoUserResponseDto.KakaoAccount kakaoAccount) {
		Member newMember = kakaoAccount.toMember();
		memberRepository.save(newMember);
		return newMember;
	}
}
