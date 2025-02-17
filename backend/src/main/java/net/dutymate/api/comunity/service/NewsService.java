package net.dutymate.api.comunity.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import net.dutymate.api.comunity.collections.News;
import net.dutymate.api.comunity.dto.GptApiResponseDto;
import net.dutymate.api.comunity.dto.NewsApiResponseDto;
import net.dutymate.api.comunity.repository.NewsRepository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NewsService {

	private final NewsRepository newsRepository;

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

	// 매일 06:00에 실행
	@Scheduled(cron = "0 0 6 * * *")
	public void executeAt6AM() throws JsonProcessingException {
		newsBatch();
	}

	// 매일 14:00에 실행
	@Scheduled(cron = "0 0 14 * * *")
	public void executeAt2PM() throws JsonProcessingException {
		newsBatch();
	}

	// 매일 21:00에 실행
	@Scheduled(cron = "0 0 21 * * *")
	public void executeAt9PM() throws JsonProcessingException {
		newsBatch();
	}

	public List<GptApiResponseDto> getNews() {
		return newsRepository.findFirstByOrderByCreatedAtDesc().getNewsList();
	}

	public void newsBatch() throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		List<GptApiResponseDto> newsList = mapper.readValue(getChatGptResponse(generatePrompt()),
			new TypeReference<>() {
			});
		newsRepository.save(News.builder()
			.newsList(newsList)
			.createdAt(LocalDateTime.now())
			.build()
		);
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
			다음의 간호사 관련 뉴스를 바탕으로 가장 간호사 및 의료와 관련도가 높은 뉴스를 4건 추출하세요.
			그리고 기사 제목과 내용을 요약하여 제공하고 뉴스 링크를 제공해주세요.
			[제약 사항]
			제목은 최대 20자
			내용은 최대 50자
			내용 뒤가 잘릴 경우 ... 처리 할 것
			응답은 항상 제시된 JSON 형식을 따를 것
			[JSON 형식]
			[
				{
					"title": "뉴스 제목 1
					"description": "뉴스 내용 요약 1",
					"link": "뉴스 링크 1"
				}
			]
			""" + requestNewsApi().toString();
	}
}
