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

    @Query("SELECT n FROM News n " +
            "WHERE (:industryId IS NULL OR n.industry.industryId = :industryId) " +
            "AND (:ds IS NULL OR n.newsPublishedAt >= :ds) " +
            "AND (:de IS NULL OR n.newsPublishedAt <= :de) " +
            "ORDER BY n.newsPublishedAt DESC")
    Page<News> findTotalFilteredNews(@Param("industryId") Integer industryId,
                                     @Param("ds") LocalDateTime ds,
                                     @Param("de") LocalDateTime de,
                                     Pageable pageable);



    @Query("SELECT n FROM News n " +
            "WHERE (:industryId IS NULL OR n.industry.industryId = :industryId) " +
            "AND (:ds IS NULL OR n.newsPublishedAt >= :ds) " +
            "AND (:de IS NULL OR n.newsPublishedAt <= :de) " +
            "ORDER BY " +
            "CASE WHEN :option = 'hot' THEN n.view END DESC, " +
            "CASE WHEN :option = 'scrap' THEN n.scrapCnt END DESC, " +
            "n.newsPublishedAt DESC") // 기본 정렬은 최신순
    Page<News> findFilteredNews(@Param("industryId") Integer industryId,
                                @Param("ds") LocalDateTime ds,
                                @Param("de") LocalDateTime de,
                                @Param("option") String option,
                                Pageable pageable);




}
