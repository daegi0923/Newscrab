package com.gihojise.newscrab.controller;

import com.gihojise.newscrab.dto.domain.HighlightDto;
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
@Tag(name = "Scrap Controller", description = "형광펜 관리 API")
public class HightlightController {

    private final HighlightService highlightService;

    // 스크랩의 모든 형광펜 조회
    @GetMapping
    public ResponseEntity<List<HighlightDto>> getAllHighlights(@PathVariable int scrapId) {
        List<HighlightDto> responseDtoList = highlightService.getAllHighlights(scrapId);
        return new ResponseEntity<>(responseDtoList, HttpStatus.OK);
    }

//    // 형광펜 추가
//    @Operation(summary = "전체 뉴스 조회", description = "모든 뉴스를 최신순으로 조회합니다.")
//    @PostMapping
//    public ResponseEntity<HighlightResponseDto> addHighlight(@PathVariable int scrapId, @RequestBody HighlightRequestDto highlightRequestDto) {
//        HighlightResponseDto responseDto = highlightService.addHighlight(scrapId, highlightRequestDto);
//        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
//    }
//
//    // 형광펜 삭제
//    @DeleteMapping("/{highlightId}")
//    public ResponseEntity<Void> deleteHighlight(@PathVariable int scrapId, @PathVariable int highlightId) {
//        highlightService.deleteHighlight(scrapId, highlightId);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }
}