package com.gihojise.newscrab.repository;

import com.gihojise.newscrab.domain.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsRepository extends JpaRepository<News, Integer> {

    // 뉴스의 상세 정보 조회를 위한 메서드
    News findByNewsId(int newsId);
}