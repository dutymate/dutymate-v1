package net.dutymate.api.enumclass;

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

}
