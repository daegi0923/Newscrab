package com.gihojise.newscrab.repository;

import com.gihojise.newscrab.domain.Voca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VocaRepository extends JpaRepository<Voca, Integer> {
    // 추가적인 커스텀 쿼리가 필요한 경우 메서드를 여기에 정의할 수 있습니다.
}
