package com.gihojise.newscrab.repository;

import com.gihojise.newscrab.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Boolean existsByLoginId(String loginId);
    Boolean existsByEmail(String email);

    User findByLoginId(String loginId);
}