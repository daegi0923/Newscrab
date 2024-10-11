package com.gihojise.newscrab.repository;

import com.gihojise.newscrab.domain.UserNewsRead;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserNewsReadRepository extends JpaRepository<UserNewsRead, Integer> {

    @Query("SELECT unr FROM UserNewsRead unr " +
            "WHERE unr.readtime = (SELECT MAX(unr2.readtime) FROM UserNewsRead unr2 " +
            "WHERE unr2.news.newsId = unr.news.newsId AND unr2.user.userId = :userId) " +
            "AND unr.user.userId = :userId")
    Page<UserNewsRead> findDistinctNewsByUserId(@Param("userId") int userId, Pageable pageable);



}
