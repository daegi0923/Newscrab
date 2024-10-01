package com.gihojise.newscrab.controller;

import com.gihojise.newscrab.dto.common.ApiResponse;
import com.gihojise.newscrab.dto.domain.HighlightDto;
import com.gihojise.newscrab.dto.request.HighlightUpdateRequestDto;
import com.gihojise.newscrab.service.HighlightService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/scrap/{scrapId}/highlight")
@RequiredArgsConstructor
@Tag(name = "Highlight Controller", description = "형광펜 관리 API")
public class HighlightController {

    private final HighlightService highlightService;

    // 스크랩의 모든 형광펜 조회
    @Operation(summary = "스크랩의 모든 형광펜 조회", description = "특정 스크랩에 속한 모든 형광펜을 조회합니다.")
    @GetMapping
    public ResponseEntity<ApiResponse<List<HighlightDto>>> getAllHighlights(@PathVariable int scrapId) {
        List<HighlightDto> responseDtoList = highlightService.getAllHighlights(scrapId);
        return ResponseEntity.ok(
                ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "형광펜 목록 조회 성공", responseDtoList)
        );
    }

    // 형광펜 추가
    @Operation(summary = "형광펜 추가", description = "해당 스크랩에 형광펜을 추가합니다.")
    @PostMapping
    public ResponseEntity<ApiResponse<Void>> addHighlight(@PathVariable int scrapId, @RequestBody HighlightDto highlightDto) {
        highlightService.addHighlight(scrapId, highlightDto);
        return ResponseEntity.ok(
                ApiResponse.of(HttpStatus.CREATED.value(), HttpStatus.CREATED.getReasonPhrase(), "형광펜 추가 성공", null)
        );
    }

    // 형광펜 삭제
    @Operation(summary = "형광펜 삭제", description = "특정 형광펜을 삭제합니다.")
    @DeleteMapping("/{highlightId}")
    public ResponseEntity<ApiResponse<Void>> deleteHighlight(@PathVariable int scrapId, @PathVariable int highlightId) {
        highlightService.deleteHighlight(scrapId, highlightId);
        return ResponseEntity.ok(
                ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "형광펜 삭제 성공", null)
        );
    }

    // 형광펜 수정
    @Operation(summary = "형광펜 색 수정", description = "특정 형광펜의 색을 수정합니다.")
    @PatchMapping("/{highlightId}")
    public ResponseEntity<ApiResponse<Void>> updateHighlight(@PathVariable int scrapId, @PathVariable int highlightId, @RequestBody HighlightUpdateRequestDto highlightUpdateRequestDto) {
        highlightService.updateHighlight(scrapId, highlightId, highlightUpdateRequestDto);
        return ResponseEntity.ok(
                ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "형광펜 색 수정 성공", null)
        );
    }
}