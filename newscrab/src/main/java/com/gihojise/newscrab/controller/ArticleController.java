package com.gihojise.newscrab.controller;

import com.gihojise.newscrab.domain.CustomUserDetails;
import com.gihojise.newscrab.dto.common.ApiResponse;
import com.gihojise.newscrab.dto.request.ArticleAddRequestDto;
import com.gihojise.newscrab.dto.response.ArticleListResponseDto;
import com.gihojise.newscrab.dto.response.ArticleResponseDto;
import com.gihojise.newscrab.service.ArticleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/article")
@RequiredArgsConstructor
@Tag(name = "Article Controller", description = "아티클 관리 API")
public class ArticleController {

        private final ArticleService articleService;

        // 스크랩 공유게시물 목록 조회
        @Operation(summary = "스크랩 공유게시물 목록 조회", description = "스크랩 공유게시물 목록을 조회합니다.")
        @GetMapping
        public ResponseEntity<ApiResponse<ArticleListResponseDto>> getArticleList(
                @AuthenticationPrincipal CustomUserDetails userDetails) {
            int userId = userDetails.getUserId();
            ArticleListResponseDto response = articleService.getArticleList();

            return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "스크랩 목록 조회 성공", response));
        }

        // 스크랩 공유게시글 상세 조회
        @Operation(summary = "스크랩 공유게시글 상세 조회", description = "스크랩 공유게시글 상세를 조회합니다.")
        @GetMapping("/{articleId}")
        public ResponseEntity<ApiResponse<ArticleResponseDto>> getArticleDetail(@PathVariable int articleId) {
            ArticleResponseDto response = articleService.getArticleDetail(articleId);

            return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "아티클 상세 조회 성공", response));
        }
        
        // 스크랩 공유게시물 추가
        @Operation(summary = "스크랩 공유게시물 추가", description = "스크랩 공유게시물을 추가합니다.")
        @PostMapping
        public ResponseEntity<ApiResponse<Void>> addArticle(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody ArticleAddRequestDto request) {
            int userId = userDetails.getUserId();
            articleService.addArticle(userId, request.getScrapId());

            return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "아티클 추가 성공", null));
        }
    
        // 스크랩 공유게시물 삭제
        @Operation(summary = "스크랩 공유게시물 삭제", description = "스크랩 공유게시물을 삭제합니다.")
        @DeleteMapping("/{articleId}")
        public ResponseEntity<ApiResponse<Void>> deleteArticle(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable int articleId) {
            int userId = userDetails.getUserId();
            articleService.deleteArticle(userId, articleId);

            return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "아티클 삭제 성공", null ));
        }

        // 스크랩 공유게시글 좋아요`
        @Operation(summary = "스크랩 좋아요", description = "스크랩을 좋아요합니다.")
        @PostMapping("/like/{articleId}")
        public ResponseEntity<ApiResponse<Void>> likeScrap(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable int articleId) {
            int userId = userDetails.getUserId();
            articleService.likeArticle(userId, articleId);
            
            return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "아티클 좋아요 성공", null));
        }

        // 스크랩 공유게시물 좋아요 취소
        @Operation(summary = "스크랩 좋아요 취소", description = "스크랩 좋아요를 취소합니다.")
        @DeleteMapping("/like/{articleId}")
        public ResponseEntity<ApiResponse<Void>> cancelLikeScrap(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable int articleId) {
            int userId = userDetails.getUserId();
            articleService.cancelLikeArticle(userId, articleId);

            return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "아티클 좋아요 취소 성공", null));
        }

}
