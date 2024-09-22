package com.gihojise.newscrab.repository;

import com.gihojise.newscrab.domain.RefreshEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.repository.CrudRepository;

@EnableRedisRepositories
public interface RefreshRepository extends CrudRepository<RefreshEntity, String> {
    Boolean existsByRefresh(String refresh);

    void deleteByRefresh(String refresh);

    RefreshEntity findByRefresh(String refresh);
}