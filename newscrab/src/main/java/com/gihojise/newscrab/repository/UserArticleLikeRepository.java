package com.gihojise.newscrab.repository;


import com.gihojise.newscrab.domain.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserArticleLikeRepository extends JpaRepository<UserArticleLike, Integer> {
    boolean existsByUser_UserIdAndArticle_ArticleId(int userId, int articleId);

    Optional<UserArticleLike> findByUserAndArticle(User user, Article article);
}
