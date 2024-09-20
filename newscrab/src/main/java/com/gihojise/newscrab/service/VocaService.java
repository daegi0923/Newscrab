package com.gihojise.newscrab.service;

import com.gihojise.newscrab.domain.Voca;
import com.gihojise.newscrab.dto.request.VocaAddRequestDto;
import com.gihojise.newscrab.dto.response.VocaListResponseDto;
import com.gihojise.newscrab.dto.response.VocaResponseDto;
import com.gihojise.newscrab.exception.ErrorCode;
import com.gihojise.newscrab.exception.NewscrabException;
import com.gihojise.newscrab.repository.VocaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VocaService {

    private final VocaRepository vocaRepository;

    // 단어 목록 조회
    @Transactional(readOnly = true)
    public VocaListResponseDto getVocaList() {
        List<VocaResponseDto> vocaList = vocaRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

        // VocaListResponseDto를 생성할 때 totalItems와 data를 명시적으로 설정
        return VocaListResponseDto.builder()
                .totalItems(vocaList.size())
                .data(vocaList)
                .build();
    }

//    // 단어 상세 조회
//    @Transactional(readOnly = true)
//    public VocaResponseDto getVocaDetail(int termId) {
//        Voca voca = vocaRepository.findById(termId)
//                .orElseThrow(() -> new NewscrabException(ErrorCode.VOCA_NOT_FOUND));
//        return convertToDto(voca);
//    }
//
//    // 단어 추가
//    @Transactional
//    public void addVoca(VocaAddRequestDto vocaAddRequestDto) {
//        Voca voca = Voca.builder()
//                .vocaName(vocaAddRequestDto.getVocaName())
//                .vocaDesc(vocaAddRequestDto.getVocaDesc())
//                .build();
//        vocaRepository.save(voca);
//    }
//
//    // 단어 수정
//    @Transactional
//    public void updateVoca(int termId, VocaAddRequestDto vocaAddRequestDto) {
//        Voca voca = vocaRepository.findById(termId)
//                .orElseThrow(() -> new NewscrabException(ErrorCode.VOCA_NOT_FOUND));
//        voca.update(vocaAddRequestDto.getVocaName(), vocaAddRequestDto.getVocaDesc());
//    }
//
//    // 단어 삭제
//    @Transactional
//    public void deleteVoca(int termId) {
//        Voca voca = vocaRepository.findById(termId)
//                .orElseThrow(() -> new NewscrabException(ErrorCode.VOCA_NOT_FOUND));
//        vocaRepository.delete(voca);
//    }
//
    // Voca를 VocaResponseDto로 변환하는 메서드
    private VocaResponseDto convertToDto(Voca voca) {
        return VocaResponseDto.builder()
                .vocaId(voca.getVocaId()) // Voca's ID
                .vocaName(voca.getVocaName()) // Word name
                .vocaDesc(voca.getVocaDesc()) // Word description
                .sentence(voca.getSentence()) // Sentence
                .industryId(voca.getIndustryId()) // Industry ID
                .originNewsId(voca.getNews().getNewsId()) // Original News ID
                .relatedNewsId1(voca.getRelatedNews1() != null ? voca.getRelatedNews1().getNewsId() : null) // Related News 1 ID
                .relatedNewsId2(voca.getRelatedNews2() != null ? voca.getRelatedNews2().getNewsId() : null) // Related News 2 ID
                .relatedNewsId3(voca.getRelatedNews3() != null ? voca.getRelatedNews3().getNewsId() : null) // Related News 3 ID
                .createdAt(voca.getCreatedAt()) // Creation timestamp
                .updatedAt(voca.getUpdatedAt()) // Update timestamp
                .build();
    }


}
