package net.dutymate.api.member.service;

import java.util.Objects;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;

import net.dutymate.api.entity.Member;
import net.dutymate.api.entity.WardMember;
import net.dutymate.api.enumclass.Gender;
import net.dutymate.api.enumclass.Provider;
import net.dutymate.api.enumclass.Role;
import net.dutymate.api.member.dto.AdditionalInfoRequestDto;
import net.dutymate.api.member.dto.AdditionalInfoResponseDto;
import net.dutymate.api.member.dto.GoogleTokenResponseDto;
import net.dutymate.api.member.dto.GoogleUserResponseDto;
import net.dutymate.api.member.dto.KakaoTokenResponseDto;
import net.dutymate.api.member.dto.KakaoUserResponseDto;
import net.dutymate.api.member.dto.LoginRequestDto;
import net.dutymate.api.member.dto.LoginResponseDto;
import net.dutymate.api.member.dto.MypageEditRequestDto;
import net.dutymate.api.member.dto.MypageResponseDto;
import net.dutymate.api.member.dto.SignUpRequestDto;
import net.dutymate.api.member.repository.MemberRepository;
import net.dutymate.api.member.util.JwtUtil;
import net.dutymate.api.wardmember.repository.WardMemberRepository;

import io.netty.handler.codec.http.HttpHeaderValues;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {

	private final MemberRepository memberRepository;
	private final JwtUtil jwtUtil;
	private final WardMemberRepository wardMemberRepository;

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
	public LoginResponseDto signUp(SignUpRequestDto signUpRequestDto) {
		if (!signUpRequestDto.getPassword().equals(signUpRequestDto.getPasswordConfirm())) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "비밀번호가 일치하지 않습니다.");
		}

		Member newMember = signUpRequestDto.toMember();
		memberRepository.save(newMember);
		return login(signUpRequestDto.toLoginRequestDto());
	}

	@Transactional(readOnly = true)
	public LoginResponseDto login(LoginRequestDto loginRequestDto) {
		// 아이디 확인
		Member member = memberRepository.findMemberByEmail(loginRequestDto.getEmail())
			.orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "아이디 또는 비밀번호 오류입니다."));

		// 만약 소셜 로그인한 이력이 있는 경우 예외 처리
		checkAnotherSocialLogin(member, Provider.NONE);

		// 비밀번호 확인
		if (!BCrypt.checkpw(loginRequestDto.getPassword(), member.getPassword())) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "아이디 또는 비밀번호 오류입니다.");
		}

		// memberId로 AccessToken 생성
		String accessToken = jwtUtil.createToken(member.getMemberId());

		boolean existAdditionalInfo =
			member.getGrade() != null && member.getGender() != null && member.getRole() != null;

		boolean existMyWard = wardMemberRepository.existsByMember(member);

		return LoginResponseDto.of(member, accessToken, existAdditionalInfo, existMyWard);
	}

	@Transactional
	public LoginResponseDto kakaoLogin(String code) {
		// KAKAO로부터 토큰 발급받아 유저 정보 확인
		String kakaoAccessToken = getKakaoAccessToken(code);
		KakaoUserResponseDto.KakaoAccount kakaoAccount = getKakaoUserInfo(kakaoAccessToken);

		// 가입된 회원 엔티티를 조회. 회원 테이블에 없으면 회원가입 처리
		Member member = memberRepository.findMemberByEmail(kakaoAccount.getEmail())
			.orElseGet(() -> signUp(kakaoAccount));

		// 만약 다른 경로(일반 이메일, GOOGLE) 회원가입한 이력이 있는 경우 예외 처리
		checkAnotherSocialLogin(member, Provider.KAKAO);

		// memberId로 AccessToken 생성
		String accessToken = jwtUtil.createToken(member.getMemberId());

		boolean existAdditionalInfo =
			member.getGrade() != null && member.getGender() != null && member.getRole() != null;

		boolean existMyWard = wardMemberRepository.existsByMember(member);

		return LoginResponseDto.of(member, accessToken, existAdditionalInfo, existMyWard);
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
		checkAnotherSocialLogin(member, Provider.GOOGLE);

		// memberId로 AccessToken 생성
		String accessToken = jwtUtil.createToken(member.getMemberId());

		boolean existAdditionalInfo =
			member.getGrade() != null && member.getGender() != null && member.getRole() != null;

		boolean existMyWard = wardMemberRepository.existsByMember(member);

		return LoginResponseDto.of(member, accessToken, existAdditionalInfo, existMyWard);
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

	private void checkAnotherSocialLogin(Member member, Provider loginProvider) {
		if (!member.getProvider().equals(loginProvider)) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "이미 다른 경로로 가입한 회원입니다.");
		}
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
		KakaoTokenResponseDto kakaoTokenResponseDto =
			requestApiByPost(kakaoTokenUri, params, KakaoTokenResponseDto.class);
		return Objects.requireNonNull(kakaoTokenResponseDto).getAccessToken();
	}

	// 액세스 토큰으로 KAKAO로부터 사용자 정보를 가져오는 메서드
	public KakaoUserResponseDto.KakaoAccount getKakaoUserInfo(String kakaoAccessToken) {
		// WebClient 인스턴스 생성 후 사용자 정보 가져오기 POST 요청
		KakaoUserResponseDto kakaoUserResponseDto
			= requestApiByPostWithAuthHeader(kakaoUserUri, kakaoAccessToken, KakaoUserResponseDto.class);
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
		return requestApiByPost(googleTokenUri, params, GoogleTokenResponseDto.class).getIdToken();
	}

	private GoogleUserResponseDto getGoogleUserInfo(String googleIdToken) {
		// 요청 param 설정
		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("id_token", googleIdToken);

		// WebClient 인스턴스 생성 후 사용자 정보 가져오기 POST 요청
		return requestApiByPost(googleUserUri, params, GoogleUserResponseDto.class);
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

	// API POST 요청 with params
	private <T> T requestApiByPost(
		String uri, MultiValueMap<String, String> params, Class<T> classType) {
		return WebClient.create().post()
			.uri(uri)
			.header(HttpHeaders.CONTENT_TYPE, HttpHeaderValues.APPLICATION_X_WWW_FORM_URLENCODED.toString())
			.body(BodyInserters.fromFormData(params))
			.retrieve()
			.bodyToMono(classType)
			.block();
	}

	// API POST 요청 with params, header
	private <T> T requestApiByPostWithAuthHeader(String uri, String token, Class<T> classType) {
		return WebClient.create().post()
			.uri(uri)
			.header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
			.header(HttpHeaders.CONTENT_TYPE, HttpHeaderValues.APPLICATION_X_WWW_FORM_URLENCODED.toString())
			.retrieve()
			.bodyToMono(classType)
			.block();
	}

	public void logout(String bearerToken) {
		String token = jwtUtil.resolveToken(bearerToken);
		// 토큰 유효기간이 남아있으면 블랙리스트에 추가
		long remainingTime = jwtUtil.getRemainingTime(token);
		if (remainingTime > 0) {
			jwtUtil.addToBlacklist(token, remainingTime);
		}
	}

	public Member getMemberById(Long memberId) {
		return memberRepository.findById(memberId)
			.orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "회원을 찾을 수 없습니다."));
	}

	// 마이페이지 정보 조회하기
	@Transactional(readOnly = true)
	public MypageResponseDto getMember(Member member) {
		WardMember wardMember = getMemberById(member.getMemberId()).getWardMember();
		return MypageResponseDto.of(wardMember, member);
	}

	@Transactional
	public void updateMember(Member member, MypageEditRequestDto mypageEditRequestDto) {

		String name = mypageEditRequestDto.getName();
		String nickname = mypageEditRequestDto.getNickname();
		String gender = mypageEditRequestDto.getGender();
		Integer grade = mypageEditRequestDto.getGrade();

		// 닉네임이 변경되었을 경우만 중복 체크
		if (nickname != null && !nickname.equals(member.getNickname())) {
			validateNickname(nickname);
		}

		member.editMember(name, nickname, gender, grade);
		memberRepository.save(member);
	}

	public void validateNickname(String nickname) {
		boolean isExisted = memberRepository.existsByNickname(nickname);
		if (isExisted) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "중복된 닉네임이 존재합니다.");
		}
	}

	@Transactional
	public void checkNickname(Member member, String nickname) {
		if (member.getNickname().equals(nickname)) {
			return;
		}
		validateNickname(nickname);
	}
}
