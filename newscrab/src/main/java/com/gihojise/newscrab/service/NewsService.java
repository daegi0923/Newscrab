package com.gihojise.newscrab.service;

import com.gihojise.newscrab.domain.News;
import com.gihojise.newscrab.dto.request.NewsLikeRequestDto;
import com.gihojise.newscrab.dto.response.NewsDetailResponseDto;
import com.gihojise.newscrab.dto.response.NewsPageResponseDto;
import com.gihojise.newscrab.dto.response.NewsResponseDto;
import com.gihojise.newscrab.repository.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NewsService {

    private final NewsRepository newsRepository;

    // 1. 전체 뉴스 조회 (페이지네이션)
    @Transactional(readOnly = true)
    public NewsPageResponseDto getAllNews(int page, int size) {
        // Pageable, Page 사용하여 데이터 처리
        // 데이터를 조회하고 DTO로 변환 후 반환
        List<NewsResponseDto> newsList = newsRepository.findAll() // 간단한 예시
                .stream()
                .map(news -> NewsResponseDto.builder()
                        .newsId(news.getNewsId())
                        .newsTitle(news.getNewsTitle())
                        .industryId(news.getIndustry().getIndustryId())
                        .newsPublishedAt(news.getNewsPublishedAt())
                        .build())
                .toList();

        return NewsPageResponseDto.builder()
                .news(newsList)
                .currentPage(page)
                .totalPages(1) // 실제 로직에서는 페이지네이션 처리를 합니다.
                .totalItems(newsList.size())
                .build();
    }

    // 2. 필터링된 뉴스 조회
    @Transactional(readOnly = true)
    public NewsPageResponseDto getFilteredNews(int industryId, int page, int size, String startDate, String endDate) {
        // 산업별, 날짜별 필터링 로직 추가 필요
        // 데이터를 조회하고 DTO로 변환 후 반환
        List<NewsResponseDto> filteredNewsList = newsRepository.findAll() // 간단한 예시
                .stream()
                .filter(news -> news.getIndustry().getIndustryId() == industryId)
                .map(news -> NewsResponseDto.builder()
                        .newsId(news.getNewsId())
                        .newsTitle(news.getNewsTitle())
                        .build())
                .toList();

        return NewsPageResponseDto.builder()
                .news(filteredNewsList)
                .currentPage(page)
                .totalPages(1)
                .totalItems(filteredNewsList.size())
                .build();
    }

    // 3. 뉴스 상세 조회
    @Transactional(readOnly = true)
    public NewsDetailResponseDto getNewsDetail(int newsId) {
        News news = newsRepository.findByNewsId(newsId);
        return NewsDetailResponseDto.builder()
                .newsId(news.getNewsId())
                .newsTitle(news.getNewsTitle())
                .industryId(news.getIndustry().getIndustryId())
                .newsContent(news.getNewsContent())
                .newsPublishedAt(news.getNewsPublishedAt())
                .createdAt(news.getCreatedAt())
                .updatedAt(news.getUpdatedAt())
                .newsUrl(news.getNewsUrl())
                .view(news.getView())
                .scrap(news.getScrapCnt())
                .build();
    }

    // 4. 인기 뉴스 조회
    @Transactional(readOnly = true)
    public NewsPageResponseDto getHotNews(int page) {
        // 조회 수가 높은 뉴스를 반환하는 로직 추가
        return null;
    }

    // 5. 인기 스크랩 뉴스 조회
    @Transactional(readOnly = true)
    public NewsPageResponseDto getHotScrapNews(int page) {
        // 스크랩 수가 많은 뉴스를 반환하는 로직 추가
        return null;
    }

    // 6. 뉴스 좋아요 (찜) 기능
    @Transactional
    public void likeNews(int newsId) {
        // 뉴스 좋아요 처리 로직 추가
        System.out.println("뉴스 좋아요 완료");
    }

    // 7. 뉴스 찜 목록 삭제
    @Transactional
    public void unlikeNews(int newsId, NewsLikeRequestDto requestDto) {
        // 뉴스 좋아요 취소 처리 로직 추가
    }
}
