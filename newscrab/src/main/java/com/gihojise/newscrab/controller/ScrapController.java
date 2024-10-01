package com.gihojise.newscrab.controller;

import com.gihojise.newscrab.domain.CustomUserDetails;
import com.gihojise.newscrab.dto.common.ApiResponse;
import com.gihojise.newscrab.dto.request.ScrapAddRequestDto;
import com.gihojise.newscrab.dto.request.ScrapUpdateRequestDto;
import com.gihojise.newscrab.dto.response.ScrapListResponseDto;
import com.gihojise.newscrab.dto.response.ScrapResponseDto;
import com.gihojise.newscrab.service.HighlightService;
import com.gihojise.newscrab.service.ScrapService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/scrap")
@RequiredArgsConstructor
@Tag(name = "Scrap Controller", description = "스크랩 관리 API")
public class ScrapController {

    private final ScrapService scrapService;
    private final HighlightService highlightService;

    // 1. 스크랩 목록 조회
    @Operation(summary = "스크랩 목록 조회", description = "사용자가 스크랩한 모든 뉴스 목록을 조회합니다.")
    @GetMapping
    public ResponseEntity<ApiResponse<ScrapListResponseDto>> getAllScraps(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        int userId = userDetails.getUserId();
        ScrapListResponseDto response = scrapService.getAllScraps(userId, page, size);
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "스크랩 목록 조회 성공", response));
    }

    // 2. 스크랩 상세 조회
    @Operation(summary = "스크랩 상세 조회", description = "스크랩 ID로 스크랩 상세 정보를 조회합니다.")
    @GetMapping("/{scrapId}")
    public ResponseEntity<ApiResponse<ScrapResponseDto>> getScrapDetail(
            @AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable int scrapId) {
        int userId = userDetails.getUserId();
        ScrapResponseDto response = scrapService.getScrapDetail(userId, scrapId);
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "스크랩 상세 조회 성공", response));
    }

    // 3. 스크랩 추가
    @Operation(summary = "스크랩 추가", description = "스크랩을 추가합니다.")
    @PostMapping
    public ResponseEntity<ApiResponse<Void>> addScrap(@AuthenticationPrincipal CustomUserDetails userDetails
            , @RequestBody ScrapAddRequestDto scrapAddRequestDto) {
        int userId = userDetails.getUserId();

        scrapService.addScrap(userId, scrapAddRequestDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.of(HttpStatus.CREATED.value(), HttpStatus.CREATED.getReasonPhrase(), "스크랩 추가 성공", null));
    }

    // 4. 스크랩 수정
    @Operation(summary = "스크랩 수정", description = "스크랩을 수정합니다.")
    @PutMapping("/{scrapId}")
    public ResponseEntity<ApiResponse<Void>> updateScrap(@AuthenticationPrincipal CustomUserDetails userDetails
            , @PathVariable int scrapId, @RequestBody ScrapUpdateRequestDto scrapUpdateRequestDto) {
        int userId = userDetails.getUserId();
        scrapService.updateScrap(userId, scrapId, scrapUpdateRequestDto);
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "스크랩 수정 성공", null));
    }

    // 5. 스크랩 삭제
    @Operation(summary = "스크랩 삭제", description = "스크랩을 삭제합니다.")
    @DeleteMapping("/{scrapId}")
    public ResponseEntity<ApiResponse<Void>> deleteScrap(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable int scrapId) {
        int userId = userDetails.getUserId();
        scrapService.deleteScrap(userId, scrapId);
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "스크랩 삭제 성공", null));
    }

}