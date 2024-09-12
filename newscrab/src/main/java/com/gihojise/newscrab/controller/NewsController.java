package com.gihojise.newscrab.controller;

import com.gihojise.newscrab.dto.common.ApiResponse;
import com.gihojise.newscrab.dto.response.NewsDetailResponseDto;
import com.gihojise.newscrab.dto.response.NewsPageResponseDto;
import com.gihojise.newscrab.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/news")
@RequiredArgsConstructor
public class NewsController {

    private final NewsService newsService;

    // 1. 전체 뉴스 조회 (페이지네이션 포함)
    @GetMapping
    public ResponseEntity<ApiResponse<NewsPageResponseDto>> getAllNews(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        NewsPageResponseDto response = newsService.getAllNews(page, size);
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "전체 뉴스 조회 성공", response));
    }

    // 2. 필터링된 뉴스 조회
    @GetMapping("/filter")
    public ResponseEntity<ApiResponse<NewsPageResponseDto>> getFilteredNews(
            @RequestParam int industryId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam String startDate,
            @RequestParam String endDate) {
        NewsPageResponseDto response = newsService.getFilteredNews(industryId, page, size, startDate, endDate);
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "필터링된 뉴스 조회 성공", response));
    }

    // 3. 뉴스 상세 조회
    @GetMapping("/{newsId}")
    public ResponseEntity<ApiResponse<NewsDetailResponseDto>> getNewsDetail(@PathVariable int newsId) {
        NewsDetailResponseDto response = newsService.getNewsDetail(newsId);
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "뉴스 상세 조회 성공", response));
    }

    // 6. 뉴스 좋아요 (찜) 기능
    @PostMapping("/like/{newsId}")
    public ResponseEntity<ApiResponse<Void>> likeNews(@PathVariable int newsId) {
        newsService.likeNews(newsId);
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "뉴스 좋아요 성공", null));
    }

    // 7. 뉴스 찜 목록 삭제
    @DeleteMapping("/like/{newsId}")
    public ResponseEntity<ApiResponse<Void>> unlikeNews(@PathVariable int newsId) {
        newsService.unlikeNews(newsId);
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.NO_CONTENT.value(), HttpStatus.NO_CONTENT.getReasonPhrase(), "뉴스 찜 목록 삭제 성공", null));
    }
}
