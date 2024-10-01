package com.gihojise.newscrab.repository;

import com.gihojise.newscrab.domain.Highlight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HighlightRepository extends JpaRepository<Highlight, Integer> {
    List<Highlight> findAllByScrap_ScrapId(int scrapId);

    void deleteByScrap_ScrapIdAndHighlightId(int scrapId, int highlightId);
}
