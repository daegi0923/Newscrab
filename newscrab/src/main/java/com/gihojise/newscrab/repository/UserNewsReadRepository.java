package com.gihojise.newscrab.repository;

import com.gihojise.newscrab.domain.UserNewsRead;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserNewsReadRepository extends JpaRepository<UserNewsRead, Integer> {
    // 유저의 뉴스 기록을 페이지 단위로 가져오는 쿼리
    Page<UserNewsRead> findByUser_UserId(int userId, Pageable pageable);
}