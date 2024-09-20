package com.gihojise.newscrab.controller;

import com.gihojise.newscrab.dto.common.ApiResponse;
import com.gihojise.newscrab.dto.request.VocaAddRequestDto;
import com.gihojise.newscrab.dto.response.VocaListResponseDto;
import com.gihojise.newscrab.dto.response.VocaResponseDto;
import com.gihojise.newscrab.service.VocaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/voca")
@RequiredArgsConstructor
public class VocaController {

    private final VocaService vocaService;

    // 1. 단어 목록 조회
    @GetMapping
    public ResponseEntity<ApiResponse<VocaListResponseDto>> getVocaList() {
        VocaListResponseDto response = vocaService.getVocaList();
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "단어 목록 조회 성공", response));
    }

    // 2. 단어 상세 조회
    @GetMapping("/{termId}")
    public ResponseEntity<ApiResponse<VocaResponseDto>> getVocaDetail(@PathVariable int termId) {
        VocaResponseDto response = vocaService.getVocaDetail(termId);
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "단어 상세 조회 성공", response));
    }

    // 3. 단어 추가
    @PostMapping
    public ResponseEntity<ApiResponse<Void>> addVoca(@RequestBody VocaAddRequestDto vocaAddRequestDto, @RequestParam int userId) {
        vocaService.addVoca(vocaAddRequestDto, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.of(HttpStatus.CREATED.value(), HttpStatus.CREATED.getReasonPhrase(), "단어 추가 성공", null));
    }
//
//    // 4. 단어 수정
//    @PutMapping("/{termId}")
//    public ResponseEntity<ApiResponse<Void>> updateVoca(@PathVariable int termId, @RequestBody VocaAddRequestDto vocaAddRequestDto) {
//        vocaService.updateVoca(termId, vocaAddRequestDto);
//        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "단어 수정 성공", null));
//    }
//
//    // 5. 단어 삭제
//    @DeleteMapping("/{termId}")
//    public ResponseEntity<ApiResponse<Void>> deleteVoca(@PathVariable int termId) {
//        vocaService.deleteVoca(termId);
//        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(ApiResponse.of(HttpStatus.NO_CONTENT.value(), HttpStatus.NO_CONTENT.getReasonPhrase(), "단어 삭제 성공", null));
//    }
}
