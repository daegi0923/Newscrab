package com.gihojise.newscrab.service;

import com.gihojise.newscrab.domain.News;
import com.gihojise.newscrab.domain.NewsPhoto;
import com.gihojise.newscrab.dto.response.NewsDetailResponseDto;
import com.gihojise.newscrab.dto.response.NewsPageResponseDto;
import com.gihojise.newscrab.dto.response.NewsResponseDto;
import com.gihojise.newscrab.exception.ErrorCode;
import com.gihojise.newscrab.exception.NewscrabException;
import com.gihojise.newscrab.repository.NewsPhotoRepository;
import com.gihojise.newscrab.repository.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NewsService {

    private final NewsRepository newsRepository;
    private final NewsPhotoRepository newsPhotoRepository;

    @Transactional(readOnly = true)
    public NewsPageResponseDto getAllNews(int page, int size) {

        Pageable pageable = PageRequest.of(page - 1, size); // Spring Data JPA에서 페이지는 0부터 시작
        Page<News> newsPage = newsRepository.findAll(pageable);

        // 각 뉴스에 대한 NewsResponseDto 리스트 생성
        List<NewsResponseDto> newsList = newsPage.getContent().stream()
                .map(news -> {
                    // 각 뉴스에 해당하는 사진 목록 조회
                    List<NewsPhoto> photos = newsPhotoRepository.findByNews_NewsId(news.getNewsId());

                    // 사진 URL 리스트 생성
                    List<String> photoUrls = photos.stream()
                            .map(NewsPhoto::getPhotoUrl)
                            .toList();

                    // NewsResponseDto 빌드
                    return NewsResponseDto.builder()
                            .newsId(news.getNewsId())
                            .newsTitle(news.getNewsTitle())
                            .newsContent(news.getNewsContent())
                            .newsCompany(news.getNewsCompany())
                            .newsUrl(news.getNewsUrl())
                            .view(news.getView())
                            .scrapCnt(news.getScrapCnt())
                            .industryId(news.getIndustry().getIndustryId())
                            .newsPublishedAt(news.getNewsPublishedAt())
                            .createdAt(news.getCreatedAt())
                            .updatedAt(news.getUpdatedAt())
                            .photoUrlList(photoUrls) // 사진 URL 리스트 추가
                            .build();
                })
                .toList();

        return NewsPageResponseDto.builder()
                .news(newsList)
                .currentPage(page)
                .totalPages(newsPage.getTotalPages())
                .totalItems((int) newsPage.getTotalElements())
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
        if (news == null) {
            // Use ErrorCode to throw the custom exception with a standardized message
            throw new NewscrabException(ErrorCode.MEMBER_NOT_FOUND);
        }
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
    public void unlikeNews(int newsId) {
        // 뉴스 좋아요 취소 처리 로직 추가
    }
}
