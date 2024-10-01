package com.gihojise.newscrab.controller;

import com.gihojise.newscrab.domain.News;
import com.gihojise.newscrab.dto.common.ApiResponse;
import com.gihojise.newscrab.dto.request.ScrapQuestionRequestDto;
import com.gihojise.newscrab.dto.response.NewsSummaryResponseDto;
import com.gihojise.newscrab.dto.response.ScrapQuestionResponseDto;
import com.gihojise.newscrab.service.ChatGPTService;
import com.gihojise.newscrab.service.NewsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/chatgpt")
@Tag(name = "ChatGPT Controller", description = "ChatGPT API")
public class ChatGPTController {

    private final ChatGPTService chatGPTService;
    private final NewsService newsService;

    @PostMapping("/pred-question")
    @Operation(summary = "예상질문 생성", description = "예상 질문을 생성 합니다")
    public ResponseEntity<ApiResponse<ScrapQuestionResponseDto>> generateQuestions(@RequestBody ScrapQuestionRequestDto scrapQuestionRequestDto) {
        News news = newsService.getNewsByNewsId(scrapQuestionRequestDto.getNewsId());
        String industry = news.getIndustry().getIndustryName();  // 클라이언트로부터 받은 산업군
        String inputText = scrapQuestionRequestDto.getText();     // 클라이언트로부터 받은 텍스트
        String newsContent =news.getNewsContent() ;// 클라이언트로부터 받은 뉴스 요약본

        String prompt = "산업군은" + industry + "이고,"+" 뉴스 내용은 "+ newsContent + "입니다." + " 해당뉴스를 보고 사용자가 만든 뉴스 요약본 제시할거야 이 요약본에 초점을 맞춰서 질문을 3개 생성해줘, 형식은 '1. 2. 3.'해서 각 번호마다 개행문자를 꼭 넣어줘, 그리고 다름 대답은 하지마";

        //응답 생성
        ScrapQuestionResponseDto response =chatGPTService.getQuestion(prompt, inputText);

        // 생성된 예상 질문을 클라이언트에 반환
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "예상질문 생성 완료", response));
    }

    // 뉴스 요약본 생성
    @GetMapping("/summary/{newsId}")
    @Operation(summary = "뉴스 요약본 생성", description = "뉴스 요약본을 생성합니다")
    public ResponseEntity<ApiResponse<NewsSummaryResponseDto>> generateSummary(@PathVariable int newsId) {
        News news = newsService.getNewsByNewsId(newsId);
        String newsContent = news.getNewsContent(); // 뉴스 내용
        NewsSummaryResponseDto response = chatGPTService.getSummary(newsContent); // 뉴스 요약본 생성

        // 생성된 뉴스 요약본을 클라이언트에 반환
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "뉴스 요약본 생성 완료", response));
    }
}
