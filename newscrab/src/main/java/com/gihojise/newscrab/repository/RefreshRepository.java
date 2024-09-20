package com.gihojise.newscrab.repository;

import com.gihojise.newscrab.domain.RefreshEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.repository.CrudRepository;

@EnableRedisRepositories
public interface RefreshRepository extends CrudRepository<RefreshEntity, Long> {
    Boolean existsByRefresh(String refresh);

    @Transactional
    void deleteByRefresh(String refresh);

    RefreshEntity findByRefresh(String refresh);
}