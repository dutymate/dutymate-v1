package net.dutymate.api.enumclass;

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
}
