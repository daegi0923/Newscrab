package com.gihojise.newscrab.service;

import com.gihojise.newscrab.domain.RefreshEntity;
import com.gihojise.newscrab.repository.RefreshRepository;
import com.gihojise.newscrab.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
@RequiredArgsConstructor
@Transactional(readOnly=true)
public class RefreshService {

    private final RefreshRepository refreshRepository;
    private final JWTUtil jwtUtil;

    @Transactional
    public void saveRefreshToken(String refresh) {
        RefreshEntity refreshEntity = RefreshEntity.builder()
                .refresh(refresh)
                .build();

        refreshRepository.save(refreshEntity);
    }

    @Transactional
    public void deleteRefreshTokenByRefresh(String refresh) {
        refreshRepository.deleteById(refresh);
    }

    public boolean existsByRefresh(String refresh) {
        return refreshRepository.existsById(refresh);
    }

    public Boolean confirmRefreshToken(String refresh) {
        return jwtUtil.getCategory(refresh).equals("refresh");
    }

    public Boolean isRefreshTokenExpired(String refresh) {
        return jwtUtil.isExpired(refresh);
    }

}
