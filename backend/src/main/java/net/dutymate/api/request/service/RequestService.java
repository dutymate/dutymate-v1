package net.dutymate.api.request.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.dutymate.api.entity.Member;
import net.dutymate.api.entity.Request;
import net.dutymate.api.request.dto.MyRequestResponseDto;
import net.dutymate.api.request.dto.RequestCreateDto;
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
		List<Request> requests = requestRepository.findAllByWardMember(member.getWardMember());
		List<MyRequestResponseDto> dtos = new ArrayList<>();
		for (Request request : requests) {
			dtos.add(MyRequestResponseDto.of(request));
		}
		return dtos;
	}
}
