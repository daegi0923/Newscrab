package com.gihojise.newscrab.repository;


import com.gihojise.newscrab.domain.News;
import com.gihojise.newscrab.domain.User;
import com.gihojise.newscrab.domain.UserNewsLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserNewsLikeRepository extends JpaRepository<UserNewsLike, Integer> {
    Optional<UserNewsLike> findByUserAndNews(User user, News news);
    // 추가적인 커스텀 쿼리가 필요한 경우 메서드를 여기에 정의할 수 있습니다.
}
