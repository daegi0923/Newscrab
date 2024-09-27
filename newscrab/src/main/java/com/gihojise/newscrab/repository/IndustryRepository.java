package com.gihojise.newscrab.repository;

import com.gihojise.newscrab.domain.Industry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IndustryRepository extends JpaRepository<Industry, Integer> {
    Industry findByIndustryId(int industryId);
}
