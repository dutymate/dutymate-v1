package net.dutymate.api.ward.dto;

import net.dutymate.api.entity.Rule;
import net.dutymate.api.entity.Ward;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RequestWardDto {

	private String hospitalName;
	private String wardName;

	public Ward toWard(String wardCode) {
		return Ward.builder()
			.wardCode(wardCode)
			.wardName(wardName)
			.hospitalName(hospitalName)
			.rule(Rule.builder().build())
			.build();
	}
}
