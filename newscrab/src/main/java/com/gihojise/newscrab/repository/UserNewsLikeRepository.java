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

    boolean existsByUserAndNews(User user, News news);
}
