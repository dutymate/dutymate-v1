package net.dutymate.api.request.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.dutymate.api.entity.Request;
import net.dutymate.api.request.dto.RequestCreateDto;
import net.dutymate.api.request.repository.RequestRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RequestService {

	private final RequestRepository requestRepository;

	@Transactional
	public void createRequest(RequestCreateDto requestCreateDto) {
		Request request = requestCreateDto.toRequest();
		requestRepository.save(request);
	}
}
