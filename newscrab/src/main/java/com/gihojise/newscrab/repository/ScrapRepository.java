package com.gihojise.newscrab.repository;

import com.gihojise.newscrab.domain.Scrap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface ScrapRepository extends JpaRepository<Scrap, Integer> {
    List<Scrap> findByUserUserId(int userId);

    Optional<Scrap> findByUserUserIdAndNewsNewsId(int userId, int newsId);

    Scrap getSrapByScrapId(int scrapId);
    // 추가적인 커스텀 쿼리가 필요한 경우 메서드를 여기에 정의할 수 있습니다.
}
