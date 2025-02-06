package net.dutymate.api.enumclass;

import java.util.Arrays;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.annotation.JsonCreator;

import lombok.Getter;

@Getter
public enum SkillLevel {
	LOW("초급"),
	MID("중급"),
	HIGH("상급");

	private final String value;

	SkillLevel(String value) {
		this.value = value;
	}

	// JSON -> Enum 변환
	@JsonCreator
	public static SkillLevel from(String level) {
		return Arrays.stream(values())
			.filter(value -> value.getValue().equals(level))
			.findAny()
			.orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 SkillLevel 값입니다."));
	}
}
