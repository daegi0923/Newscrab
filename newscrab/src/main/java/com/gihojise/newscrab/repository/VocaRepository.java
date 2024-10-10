package com.gihojise.newscrab.repository;

import com.gihojise.newscrab.domain.Voca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VocaRepository extends JpaRepository<Voca, Integer> {

    List<Voca> findByUserUserId(int userId);

    List<Voca> findByUserUserIdAndNewsNewsId(int userId, Integer newsId);
}
