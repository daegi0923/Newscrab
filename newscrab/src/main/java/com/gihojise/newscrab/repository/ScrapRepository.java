package com.gihojise.newscrab.repository;

import com.gihojise.newscrab.domain.Scrap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Repository
public interface ScrapRepository extends JpaRepository<Scrap, Integer> {
    List<Scrap> findByUserUserId(int userId);

    Optional<Scrap> findByUserUserIdAndNewsNewsId(int userId, int newsId);

    Scrap getSrapByScrapId(int scrapId);
}
