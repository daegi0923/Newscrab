package com.gihojise.newscrab.repository;

import com.gihojise.newscrab.domain.Article;
import com.gihojise.newscrab.domain.Scrap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Integer> {
    Optional<Article> findByUser_UserIdAndArticleId(int userId, int articleId);
}
