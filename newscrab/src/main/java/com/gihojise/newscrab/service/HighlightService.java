package com.gihojise.newscrab.service;

import com.gihojise.newscrab.domain.Highlight;
import com.gihojise.newscrab.domain.Scrap;
import com.gihojise.newscrab.dto.request.HighlightRequestDto;
import com.gihojise.newscrab.repository.HighlightRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HighlightService {

    private final HighlightRepository highlightRepository;

    // 하이라이트 저장
    @Transactional
    public void addHighlight(Scrap scrap) {
        List<Highlight> highlights = scrap.getHighlights();
        highlights.forEach(highlight -> {
            highlightRepository.save(new Highlight(scrap, highlight.getStartPos(), highlight.getEndPos(),highlight.getColor()));
        });
    }
}
