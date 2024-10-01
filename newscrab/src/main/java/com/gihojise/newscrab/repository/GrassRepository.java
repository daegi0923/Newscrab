package com.gihojise.newscrab.repository;

import com.gihojise.newscrab.domain.Grass;
import io.lettuce.core.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface GrassRepository extends JpaRepository<Grass, Integer> {

    List<Grass> findAllByUser_UserId(int userId);
}
