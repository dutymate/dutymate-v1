package net.dutymate.api.enumclass;

import java.util.Arrays;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.annotation.JsonCreator;

import lombok.Getter;

@Getter
public enum RequestStatus {

	ACCEPTED("승인"),
	DENIED("거절"),
	HOLD("대기");

	private final String value;

	RequestStatus(String value) {
		this.value = value;
	}

	// JSON -> Enum 변환
	@JsonCreator
	public static RequestStatus from(String status) {
		return Arrays.stream(values())
			.filter(value -> value.getValue().equals(status))
			.findAny()
			.orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 상태 값입니다."));
	}
}
