package com.gihojise.newscrab.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gihojise.newscrab.dto.response.NewsSummaryResponseDto;
import com.gihojise.newscrab.dto.response.ScrapQuestionResponseDto;
import com.gihojise.newscrab.exception.ErrorCode;
import com.gihojise.newscrab.exception.NewscrabException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatGPTService {

    @Value("${chatgpt.key}")  // application.yml에서 API 키 불러오기
    private String apiKey;  // 발급받은 API 키
    private final String gptApiUrl = "https://api.openai.com/v1/chat/completions";

    public ScrapQuestionResponseDto getQuestion(String prompt, String inputText) {
        // OpenAI API에 보낼 요청 바디 생성
        Map<String, Object> requestPayload = new HashMap<>();
        // ChatGPT API 요청에 필요한 파라미터 설정
        requestPayload.put("model", "gpt-3.5-turbo");
        requestPayload.put("messages", List.of(
                // ChatGPT API에 보낼 메시지 - 맥락
                Map.of("role", "system", "content", prompt),
                // ChatGPT API에 보낼 메시지 - 사용자 입력
                Map.of("role", "user", "content", inputText)
        ));
        // 응답 길이 설정
        requestPayload.put("max_tokens", 300);  // 응답의 최대 토큰 수

        try {
            // HTTP 요청 생성
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestPayload, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(gptApiUrl, entity, String.class);

            // 응답 처리
            if (response.getStatusCode() == HttpStatus.OK) {
                ObjectMapper mapper = new ObjectMapper();
                JsonNode root = mapper.readTree(response.getBody());
                String generatedText = root.path("choices").get(0).path("message").path("content").asText();

                // 생성된 예상 질문을 반환
                return new ScrapQuestionResponseDto(generatedText);
            } else {
                log.info("ChatGPT API 요청 중 오류 발생: {}", response.getStatusCode());
                throw new NewscrabException(ErrorCode.CHATGPT_ERROR);
            }
        } catch (Exception e) {
            // 예외 발생 시 오류 메시지 던짐
            log.info("ChatGPT API 요청 중 오류 발생: {}", e.getMessage());
            throw new NewscrabException(ErrorCode.CHATGPT_ERROR);
        }
    }

    // 뉴스 요약본 생성
    public NewsSummaryResponseDto getSummary(String newsContent) {
        // OpenAI API에 보낼 요청 바디 생성
        Map<String, Object> requestPayload = new HashMap<>();
        // ChatGPT API 요청에 필요한 파라미터 설정
        requestPayload.put("model", "gpt-3.5-turbo");
        requestPayload.put("messages", List.of(
                // ChatGPT API에 보낼 메시지 - 맥락
                Map.of("role", "system", "content", "뉴스 내용을 제공할테니 뉴스 요약본을 생성해주세요. 형식은 '1.서론 : 2.본론 : 3.결론 : '으로 한줄씩 띄워서 최대 400자 이내로 해줘. 다른 대답은 없이 요약만 생성해줘."),
                // ChatGPT API에 보낼 메시지 - 사용자 입력
                Map.of("role", "user", "content", newsContent)
        ));
        // 응답 길이 설정
        requestPayload.put("max_tokens", 500);  // 응답의 최대 토큰 수

        try {
            // HTTP 요청 생성
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestPayload, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(gptApiUrl, entity, String.class);

            // 응답 처리
            if (response.getStatusCode() == HttpStatus.OK) {
                ObjectMapper mapper = new ObjectMapper();
                JsonNode root = mapper.readTree(response.getBody());
                String generatedText = root.path("choices").get(0).path("message").path("content").asText();

                // 생성된 뉴스 요약본을 반환
                return new NewsSummaryResponseDto(generatedText);
            } else {
                log.info("ChatGPT API 요청 중 오류 발생: {}", response.getStatusCode());
                throw new NewscrabException(ErrorCode.CHATGPT_ERROR);
            }
        } catch (Exception e) {
            // 예외 발생 시 오류 메시지 던짐
            log.info("ChatGPT API 요청 중 오류 발생: {}", e.getMessage());
            throw new NewscrabException(ErrorCode.CHATGPT_ERROR);
        }
    }

}
