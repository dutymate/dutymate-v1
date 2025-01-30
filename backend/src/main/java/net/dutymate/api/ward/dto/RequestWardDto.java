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

	public Ward toWard() {
		return Ward.builder()
			.wardName(wardName)
			.hospitalName(hospitalName)
			.rule(Rule.createDefaultRule())
			.build();
	}
}
