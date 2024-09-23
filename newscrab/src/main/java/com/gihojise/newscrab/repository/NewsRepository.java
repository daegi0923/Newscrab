package com.gihojise.newscrab.repository;

import com.gihojise.newscrab.domain.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface NewsRepository extends JpaRepository<News, Integer> {

    // 조회수 높은 뉴스, 최근 1주일 이내 필터링
    @Query("SELECT n FROM News n WHERE n.newsPublishedAt > :oneWeekAgo ORDER BY n.view DESC")
    Page<News> findHotNews(@Param("oneWeekAgo") LocalDateTime oneWeekAgo, Pageable pageable);

    // 스크랩 카운트 높은 뉴스, 최근 1주일 이내 필터링
    @Query("SELECT n FROM News n WHERE n.newsPublishedAt > :oneWeekAgo ORDER BY n.scrapCnt DESC")
    Page<News> findHotScrapNews(@Param("oneWeekAgo") LocalDateTime oneWeekAgo, Pageable pageable);

    News findByNewsId(int newsId);
}
