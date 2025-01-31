package net.dutymate.api.request.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.dutymate.api.entity.Member;
import net.dutymate.api.entity.Request;
import net.dutymate.api.entity.Ward;
import net.dutymate.api.request.dto.MyRequestResponseDto;
import net.dutymate.api.request.dto.RequestCreateDto;
import net.dutymate.api.request.dto.WardRequestResponseDto;
import net.dutymate.api.request.repository.RequestRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RequestService {

	private final RequestRepository requestRepository;

	@Transactional
	public void createRequest(RequestCreateDto requestCreateDto, Member member) {
		Request request = requestCreateDto.toRequest(member);
		requestRepository.save(request);
	}

	@Transactional
	public List<MyRequestResponseDto> readMyRequest(Member member) {
		return requestRepository.findAllByWardMember(member.getWardMember())
			.stream()
			.map(MyRequestResponseDto::of)
			.toList();
	}

	@Transactional
	public List<WardRequestResponseDto> readWardRequest(Member member) {
		Ward myWard = member.getWardMember().getWard();
		return requestRepository.findByWardMember_Ward(myWard)
			.stream()
			.map(WardRequestResponseDto::of)
			.toList();

	}
}
