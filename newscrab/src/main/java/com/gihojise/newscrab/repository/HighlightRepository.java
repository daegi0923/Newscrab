package com.gihojise.newscrab.repository;

import com.gihojise.newscrab.domain.Highlight;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HighlightRepository extends JpaRepository<Highlight, Integer> {
}
