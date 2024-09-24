package com.gihojise.newscrab.repository;

import com.gihojise.newscrab.domain.User;
import com.gihojise.newscrab.domain.UserIndustry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserIndustryRepository extends JpaRepository<UserIndustry, Integer> {
}
