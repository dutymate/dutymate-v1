package net.dutymate.api.request.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

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
		if (!String.valueOf(member.getRole()).equals("HN")) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "관리자만 접근할 수 있는 요청입니다.");
		}
		Ward myWard = member.getWardMember().getWard();
		return requestRepository.findAllWardRequests(myWard)
			.stream()
			.map(WardRequestResponseDto::of)
			.toList();
	}
}
