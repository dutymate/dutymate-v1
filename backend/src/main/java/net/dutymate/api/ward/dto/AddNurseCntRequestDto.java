package net.dutymate.api.ward.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddNurseCntRequestDto {

	private Integer virtualNurseCnt;
}
