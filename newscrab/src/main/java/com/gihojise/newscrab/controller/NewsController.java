package com.gihojise.newscrab.controller;

import com.gihojise.newscrab.dto.request.NewsLikeRequestDto;
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
    public ResponseEntity<NewsPageResponseDto> getAllNews(
            @RequestParam int page,
            @RequestParam int size) {
        NewsPageResponseDto response = newsService.getAllNews(page, size);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 2. 필터링된 뉴스 조회
    @GetMapping("/filter")
    public ResponseEntity<NewsPageResponseDto> getFilteredNews(
            @RequestParam int industryId,
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam String startDate,
            @RequestParam String endDate) {
        NewsPageResponseDto response = newsService.getFilteredNews(industryId, page, size, startDate, endDate);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 3. 뉴스 상세 조회
    @GetMapping("/{newsId}")
    public ResponseEntity<NewsDetailResponseDto> getNewsDetail(@PathVariable int newsId) {
        NewsDetailResponseDto response = newsService.getNewsDetail(newsId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 4. 인기 뉴스 조회
    @GetMapping("/hot")
    public ResponseEntity<NewsPageResponseDto> getHotNews(@RequestParam int page) {
        NewsPageResponseDto response = newsService.getHotNews(page);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 5. 인기 스크랩 뉴스 조회
    @GetMapping("/hot_scrap")
    public ResponseEntity<NewsPageResponseDto> getHotScrapNews(@RequestParam int page) {
        NewsPageResponseDto response = newsService.getHotScrapNews(page);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 6. 뉴스 좋아요 (찜) 기능
    @PostMapping("/like/{newsId}")
    public ResponseEntity<Void> likeNews(@PathVariable int newsId) {
        newsService.likeNews(newsId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 7. 뉴스 찜 목록 삭제
    @DeleteMapping("/like/{newsId}")
    public ResponseEntity<Void> unlikeNews(@PathVariable int newsId, @RequestBody NewsLikeRequestDto requestDto) {
        newsService.unlikeNews(newsId, requestDto);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
