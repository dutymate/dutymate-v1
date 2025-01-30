package net.dutymate.api.request.dto;

import java.sql.Date;
import java.sql.Timestamp;

import net.dutymate.api.entity.Request;
import net.dutymate.api.entity.WardMember;
import net.dutymate.api.enumclass.RequestStatus;
import net.dutymate.api.enumclass.Shift;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RequestCreateDto {
	private Date date;
	private String shift;
	private String memo;

	public Request toRequest() {
		return Request.builder()
			.requestDate(date)
			.requestShift(Shift.valueOf(shift))
			.memo(memo)
			.wardMember(new WardMember(1L))
			.createdAt(new Timestamp(System.currentTimeMillis()))
			.status(RequestStatus.HOLD)
			.build();
	}
}
