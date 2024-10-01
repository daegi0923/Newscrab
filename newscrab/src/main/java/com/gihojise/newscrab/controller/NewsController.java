package com.gihojise.newscrab.controller;

import com.gihojise.newscrab.domain.CustomUserDetails;
import com.gihojise.newscrab.dto.common.ApiResponse;
import com.gihojise.newscrab.dto.response.NewsDetailResponseDto;
import com.gihojise.newscrab.dto.response.NewsPageResponseDto;
import com.gihojise.newscrab.dto.response.NewsRecoResponseDto;
import com.gihojise.newscrab.dto.response.RecoListResponseDto;
import com.gihojise.newscrab.service.NewsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.TableGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/v1/news")
@RequiredArgsConstructor
@Tag(name = "News Controller", description = "뉴스 관리 API")
public class NewsController {

    private final NewsService newsService;

    // 1. 전체 뉴스 조회 (10개씩 최신순)
    @Deprecated
    @Operation(summary = "전체 뉴스 조회", description = "모든 뉴스를 최신순으로 조회합니다.")
    @GetMapping
    public ResponseEntity<ApiResponse<NewsPageResponseDto>> getAllNews(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        NewsPageResponseDto response = newsService.getAllNews(page, size);
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "전체 뉴스 조회 성공", response));
    }

    // 2. 사용자 필터 뉴스 조회
    @Operation(summary = "필터링된 뉴스 조회", description = "사용자가 선택한 산업군에 따라 뉴스를 필터링하여 조회합니다.")
    @GetMapping("/filter")
    public ResponseEntity<ApiResponse<NewsPageResponseDto>> getFilteredNews(
            @RequestParam(value = "industryId", required = false, defaultValue = "-1") Integer industryId,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size,
            @RequestParam(value = "ds", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate ds,
            @RequestParam(value = "de", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate de,
            @RequestParam(value = "option", required = false, defaultValue = "total") String option) {

        // `industryId`가 -1일 경우, 전체 뉴스 조회로 처리
        if (industryId == -1) {
            industryId = null; // DB 쿼리에서 전체 조회로 처리
        }

        NewsPageResponseDto response = newsService.getFilteredNews(industryId, page, size, ds, de, option);
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "필터링된 뉴스 조회 성공", response));
    }


    // 3. 뉴스 상세 조회
    @Operation(summary = "뉴스 상세 조회", description = "뉴스 ID로 뉴스 상세 정보를 조회합니다.")
    @GetMapping("/{newsId}")
    public ResponseEntity<ApiResponse<NewsDetailResponseDto>> getNewsDetail(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable int newsId) {
        NewsDetailResponseDto response = newsService.getNewsDetail(userDetails.getUserId(), newsId);
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "뉴스 상세 조회 성공", response));
    }

    // 4. 인기 기사 (최근 1주일간 조회수 높은 기사 조회)
    @Deprecated
    @Operation(summary = "인기 기사 조회", description = "최근 1주일간 조회수가 높은 기사를 조회합니다.")
    @GetMapping("/hot")
    public ResponseEntity<ApiResponse<NewsPageResponseDto>> getHotNews(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        NewsPageResponseDto response = newsService.getHotNews(page, size);
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "인기 기사 조회 성공", response));
    }

    // 5. 인기 스크랩 기사 (최근 1주일간 스크랩한 기사 조회)
    @Deprecated
    @Operation(summary = "인기 스크랩 기사 조회", description = "최근 1주일간 스크랩한 기사를 조회합니다.")
    @GetMapping("/hot_scrap")
    public ResponseEntity<ApiResponse<NewsPageResponseDto>> getHotScrapNews(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        NewsPageResponseDto response = newsService.getHotScrapNews(page, size);
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "인기 스크랩 기사 조회 성공", response));
    }


    // 6. 찜 하기
    @Operation(summary = "뉴스 좋아요", description = "뉴스를 찜 목록에 추가합니다.")
    @PostMapping("/like/{newsId}")
    public ResponseEntity<ApiResponse<Void>> likeNews(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable int newsId) {
        int userId = userDetails.getUserId();
        newsService.likeNews(newsId, userId);
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "뉴스 좋아요 성공", null));
    }

    // 7. 찜 목록 삭제
    @Operation(summary = "뉴스 찜 삭제", description = "뉴스를 찜 목록에서 삭제합니다.")
    @DeleteMapping("/like/{newsId}")
    public ResponseEntity<ApiResponse<Void>> unlikeNews(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable int newsId) {
        int userId = userDetails.getUserId();
        newsService.unlikeNews(newsId, userId);
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.NO_CONTENT.value(), HttpStatus.NO_CONTENT.getReasonPhrase(), "뉴스 찜 목록 삭제 성공", null));
    }

    // 8. 찜 여부 조회
    @Operation(summary = "뉴스 찜 여부 조회", description = "뉴스 찜 여부를 조회합니다.")
    @GetMapping("/like/{newsId}")
    public ResponseEntity<ApiResponse<Boolean>> isLiked(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable int newsId) {
        int userId = userDetails.getUserId();
        boolean isLiked = newsService.isLiked(newsId, userId);
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "뉴스 찜 여부 조회 성공", isLiked));
    }

    // 9. 추천뉴스 조회
    @Operation(summary = "추천 뉴스 조회", description = "사용자에게 추천되는 뉴스를 조회합니다.")
    @GetMapping("/recommend/List")
    public ResponseEntity<ApiResponse<NewsRecoResponseDto>> getRecommendNews(@AuthenticationPrincipal CustomUserDetails userDetails) {
        int userId = userDetails.getUserId();
        // fastapi로 추천뉴스 받아오기
        NewsRecoResponseDto response = newsService.getRecommendNews(userId);
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "추천 뉴스 조회 성공", response));
    }

}
