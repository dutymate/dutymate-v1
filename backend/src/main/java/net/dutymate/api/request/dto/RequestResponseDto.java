package net.dutymate.api.request.dto;

import java.sql.Date;

import net.dutymate.api.entity.Request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RequestResponseDto {

	private Date date;
	private String shift;
	private String memo;
	private String status;

	public static RequestResponseDto of(Request request) {
		return RequestResponseDto.builder()
			.date(request.getRequestDate())
			.shift(String.valueOf(request.getRequestShift()))
			.memo(request.getMemo())
			.status(String.valueOf(request.getStatus()))
			.build();
	}
}
