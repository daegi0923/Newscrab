package com.gihojise.newscrab.service;

import com.gihojise.newscrab.dto.request.ScrapAddRequestDto;
import com.gihojise.newscrab.dto.response.NewsPageResponseDto;
import com.gihojise.newscrab.dto.response.ScrapListResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ScrapService {

    // 1. 스크랩 목록 조회
    public ScrapListResponseDto getAllScraps(int page, int size) {
        return null;
    }

    // 2. 스크랩 상세 조회
    public NewsPageResponseDto getScrapDetail(int userId, int scrapId) {
        return null;
    }

    // 3. 스크랩 추가
    public void addScrap(int userId, ScrapAddRequestDto scrapAddRequestDto) {
    }

    // 4. 스크랩 수정
    public void updateScrap(int userId, int scrapId, ScrapAddRequestDto scrapAddRequestDto) {
    }

    // 5. 스크랩 삭제
    public void deleteScrap(int userId, int scrapId) {
    }
}
