package com.gihojise.newscrab.service;

import com.gihojise.newscrab.domain.Highlight;
import com.gihojise.newscrab.domain.Scrap;
import com.gihojise.newscrab.dto.domain.HighlightDto;
import com.gihojise.newscrab.dto.request.HighlightRequestDto;
import com.gihojise.newscrab.enums.HighlightColor;
import com.gihojise.newscrab.repository.HighlightRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HighlightService {

    private final HighlightRepository highlightRepository;

    // 형광펜 추가
    @Transactional
    public void addHighlight(Scrap scrap) {
        List<Highlight> highlights = scrap.getHighlights();
        highlights.forEach(highlight -> {
            highlightRepository.save(new Highlight(scrap, highlight.getStartPos(), highlight.getEndPos(),highlight.getColor()));
        });
    }

    // 형광펜 조회
    @Transactional(readOnly = true)
    public List<HighlightDto> getAllHighlights(int scrapId) {
        List<Highlight> highlights = highlightRepository.findAllByScrap_ScrapId(scrapId);

        // 엔티티를 DTO로 변환하여 반환
        return highlights.stream()
                .map(highlight -> HighlightDto.builder()
                        .highlightId(highlight.getHighlightId())
                        .startPos(highlight.getStartPos())
                        .endPos(highlight.getEndPos())
                        .color(HighlightColor.valueOf(highlight.getColor().toString())) // Enum을 문자열로 변환
                        .build())
                .collect(Collectors.toList());
    }

    // 형광펜 삭제
    @Transactional
    public void deleteHighlight(int scrapId, int highlightId) {
        highlightRepository.deleteByScrap_ScrapIdAndHighlightId(scrapId, highlightId);
    }
}
