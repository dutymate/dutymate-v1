package net.dutymate.api.member.service;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;

import net.dutymate.api.entity.Member;
import net.dutymate.api.enumclass.Gender;
import net.dutymate.api.enumclass.Provider;
import net.dutymate.api.enumclass.Role;
import net.dutymate.api.member.dto.AdditionalInfoRequestDto;
import net.dutymate.api.member.dto.AdditionalInfoResponseDto;
import net.dutymate.api.member.dto.GoogleTokenResponseDto;
import net.dutymate.api.member.dto.GoogleUserResponseDto;
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

	@Value("${google.client.id}")
	private String googleClientId;
	@Value("${google.client.secret}")
	private String googleClientSecret;
	@Value("${google.token.uri}")
	private String googleTokenUri;
	@Value("${google.user.uri}")
	private String googleUserUri;
	@Value("${google.redirect.uri}")
	private String googleRedirectUri;

	@Transactional
	public LoginResponseDto kakaoLogin(String code) {
		// KAKAO로부터 토큰 발급받아 유저 정보 확인
		String kakaoAccessToken = getKakaoAccessToken(code);
		KakaoUserResponseDto.KakaoAccount kakaoAccount = getKakaoUserInfo(kakaoAccessToken);

		// 가입된 회원 엔티티를 조회. 회원 테이블에 없으면 회원가입 처리
		Member member = memberRepository.findMemberByEmail(kakaoAccount.getEmail())
			.orElseGet(() -> signUp(kakaoAccount));

		// 만약 다른 경로(일반 이메일, GOOGLE) 회원가입한 이력이 있는 경우 예외 처리
		if (!member.getProvider().equals(Provider.KAKAO)) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "이미 다른 경로로 가입한 회원입니다.");
		}

		// memberId로 AccessToken 생성
		String accessToken = jwtUtil.createToken(member.getMemberId());

		boolean existAdditionalInfo =
			member.getGrade() != null && member.getGender() != null && member.getRole() != null;

		// TODO 병동 입장 여부 확인

		return LoginResponseDto.of(member, accessToken, existAdditionalInfo, false);
	}

	@Transactional
	public LoginResponseDto googleLogin(String code) {
		// GOOGLE로부터 토큰 발급받아 유저 정보 확인
		String googleIdToken = getGoogleIdToken(code);
		GoogleUserResponseDto googleUserInfo = getGoogleUserInfo(googleIdToken);

		// 가입된 회원 엔티티를 조회. 회원 테이블에 없으면 회원가입 처리
		Member member = memberRepository.findMemberByEmail(googleUserInfo.getEmail())
			.orElseGet(() -> signUp(googleUserInfo));

		// 만약 다른 경로(일반 이메일, KAKAO) 회원가입한 이력이 있는 경우 예외 처리
		if (!member.getProvider().equals(Provider.GOOGLE)) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "이미 다른 경로로 가입한 회원입니다.");
		}

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
		// WebClient 인스턴스 생성 후 사용자 정보 가져오기 POST 요청
		KakaoUserResponseDto kakaoUserResponseDto = WebClient.create().post()
			.uri(kakaoUserUri)
			.header(HttpHeaders.AUTHORIZATION, "Bearer " + kakaoAccessToken)
			.header(HttpHeaders.CONTENT_TYPE, HttpHeaderValues.APPLICATION_X_WWW_FORM_URLENCODED.toString())
			.retrieve()
			.bodyToMono(KakaoUserResponseDto.class)
			.block();
		return Objects.requireNonNull(kakaoUserResponseDto).getKakaoAccount();
	}

	private String getGoogleIdToken(String code) {
		// 요청 Param 설정
		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("grant_type", "authorization_code");
		params.add("client_id", googleClientId);
		params.add("client_secret", googleClientSecret);
		params.add("redirect_uri", googleRedirectUri);
		params.add("code", code);

		// WebClient 인스턴스 생성 후 토큰 받기 POST 요청
		GoogleTokenResponseDto googleTokenResponseDto = WebClient.create().post()
			.uri(googleTokenUri)
			.body(BodyInserters.fromFormData(params))
			.header(HttpHeaders.CONTENT_TYPE, HttpHeaderValues.APPLICATION_X_WWW_FORM_URLENCODED.toString())
			.retrieve()
			.bodyToMono(GoogleTokenResponseDto.class)
			.block();
		return Objects.requireNonNull(googleTokenResponseDto).getIdToken();
	}

	private GoogleUserResponseDto getGoogleUserInfo(String googleIdToken) {
		// 요청 param 설정
		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("id_token", googleIdToken);

		// WebClient 인스턴스 생성 후 사용자 정보 가져오기 POST 요청
		return WebClient.create().post()
			.uri(googleUserUri)
			.header(HttpHeaders.CONTENT_TYPE, HttpHeaderValues.APPLICATION_X_WWW_FORM_URLENCODED.toString())
			.body(BodyInserters.fromFormData(params))
			.retrieve()
			.bodyToMono(GoogleUserResponseDto.class)
			.block();
	}

	// KAKAO 계정으로 회원가입
	private Member signUp(KakaoUserResponseDto.KakaoAccount kakaoAccount) {
		Member newMember = kakaoAccount.toMember();
		memberRepository.save(newMember);
		return newMember;
	}

	// GOOGLE 계정으로 회원가입
	private Member signUp(GoogleUserResponseDto googleUserInfo) {
		Member newMember = googleUserInfo.toMember();
		memberRepository.save(newMember);
		return newMember;
	}
}
