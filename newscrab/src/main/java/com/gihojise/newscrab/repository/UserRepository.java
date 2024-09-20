package com.gihojise.newscrab.repository;

import com.gihojise.newscrab.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    Boolean existsByLoginId(String loginId);

    User findByLoginId(String loginId);
}