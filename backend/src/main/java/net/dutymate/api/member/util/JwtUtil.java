package net.dutymate.api.member.util;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	@Value("${jwt.secret}")
	private String secretKey;

	@Value("${jwt.expiration}")
	private long expiration;

	// SecretKey 생성
	private SecretKey getSigningKey() {
		return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
	}

	// Access Token 생성
	public String createToken(Long memberId) {
		return Jwts.builder()
			.issuedAt(new Date())
			.expiration(new Date(System.currentTimeMillis() + expiration))
			.claim("memberId", memberId)
			.signWith(getSigningKey())
			.compact();
	}

	// Token 유효성 검증
	public boolean validateToken(String token) {
		try {
			Jwts.parser()
				.verifyWith(getSigningKey())
				.build()
				.parseSignedClaims(token);
			return true;
		} catch (JwtException | IllegalArgumentException e) {
			return false;
		}
	}

	// Token에서 멤버 정보 추출
	public Long getMemberId(String token) {
		return Jwts.parser()
			.verifyWith(getSigningKey())
			.build()
			.parseSignedClaims(token)
			.getPayload()
			.get("memberId", Long.class);
	}
}
