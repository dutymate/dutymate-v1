package net.dutymate.api.comunity.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import net.dutymate.api.comunity.dto.GptApiResponseDto;
import net.dutymate.api.comunity.dto.NewsApiResponseDto;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NewsService {

	@Value("${naver.client.id}")
	private String naverClientId;
	@Value("${naver.client.secret}")
	private String naverClientSecret;
	@Value("${naver.news.uri}")
	private String naverNewsUri;
	@Value("${openai.uri}")
	private String openaiUri;
	@Value("${openai.model}")
	private String openaiModel;
	@Value("${openai.secret-key}")
	private String openaiSecretKey;

	public List<GptApiResponseDto> getNews() throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		return mapper.readValue(getChatGptResponse(generatePrompt()), new TypeReference<>() {
		});
	}

	private NewsApiResponseDto requestNewsApi() {
		return WebClient.create().get()
			.uri(naverNewsUri)
			.header("X-Naver-Client-Id", naverClientId)
			.header("X-Naver-Client-Secret", naverClientSecret)
			.retrieve()
			.bodyToMono(NewsApiResponseDto.class)
			.block();
	}

	public String getChatGptResponse(String prompt) {
		return WebClient.create().post()
			.uri(openaiUri)
			.header("Authorization", "Bearer " + openaiSecretKey)
			.header("Content-Type", "application/json")
			.bodyValue(Map.of(
				"model", openaiModel,
				"messages", new Object[] {Map.of("role", "user", "content", prompt)},
				"temperature", 0.7
			))
			.retrieve()
			.bodyToMono(Map.class)
			.map(response -> {
				List<Map<String, Object>> choices = (List<Map<String, Object>>)response.get("choices");
				if (choices != null && !choices.isEmpty()) {
					Map<String, Object> message = (Map<String, Object>)choices.getFirst().get("message");
					return message.get("content").toString();  // 메시지 내용만 반환
				}
				return "No response from ChatGPT.";
			})
			.block();

	}

	public String generatePrompt() {
		return """
			다음의 간호사 관련 뉴스를 바탕으로 가장 간호사와 관련도가 높은 뉴스를 3건 추출하세요.
			그리고 기사 제목과 내용을 요약하여 제공하고 뉴스 링크를 제공해주세요.
			[제약 사항]
			요약한 내용은 최대 30자
			응답은 항상 제시된 JSON 형식을 따를 것
			[JSON 형식]
			[
				{
					"description": "뉴스 요약 1",
					"link": "뉴스 링크 1"
				}
			]
			""" + requestNewsApi().toString();
	}
}
