package com.gihojise.newscrab.service;

import com.gihojise.newscrab.domain.*;
import com.gihojise.newscrab.dto.response.*;
import com.gihojise.newscrab.exception.ErrorCode;
import com.gihojise.newscrab.exception.NewscrabException;
import com.gihojise.newscrab.repository.*;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class NewsService {

    private final NewsRepository newsRepository;
    private final NewsPhotoRepository newsPhotoRepository;
    private final UserRepository userRepository;
    private final UserNewsReadRepository userNewsReadRepository;
    private final UserNewsLikeRepository userNewsLikeRepository;
    private final ScrapRepository scrapRepository;

    @Value("${FAST_API_HOST}")
    String host;

    // 변환 메서드: News 객체를 NewsResponseDto로 변환
    private NewsResponseDto convertToDto(News news) {
        if (news == null) {
            return null;
        }

        // 기본값 설정을 위해 Optional을 사용하거나 null 체크 후 설정
        String newsTitle = Optional.ofNullable(news.getNewsTitle()).orElse("제목 없음");
        String newsContent = Optional.ofNullable(news.getNewsContent()).orElse("내용 없음");
        String newsCompany = Optional.ofNullable(news.getNewsCompany()).orElse("출처 없음");
        String newsUrl = Optional.ofNullable(news.getNewsUrl()).orElse("URL 없음");
        LocalDateTime createdAt = Optional.ofNullable(news.getCreatedAt()).orElse(LocalDateTime.now());
        LocalDateTime updatedAt = Optional.ofNullable(news.getUpdatedAt()).orElse(LocalDateTime.now());
        int view = Optional.ofNullable(news.getView()).orElse(0);
        int scrapCnt = Optional.ofNullable(news.getScrapCnt()).orElse(0);

        // 사진 URL 리스트 조회
        List<NewsPhoto> photos = newsPhotoRepository.findByNews_NewsId(news.getNewsId());
        List<String> photoUrls = photos.stream()
                .map(NewsPhoto::getPhotoUrl)
                .toList();

        return NewsResponseDto.builder()
                .newsId(news.getNewsId())
                .newsTitle(newsTitle)
                .newsContent(newsContent)
                .industryId(news.getIndustry().getIndustryId())
                .newsPublishedAt(news.getNewsPublishedAt())
                .newsCompany(newsCompany)
                .newsUrl(newsUrl)
                .view(view)
                .scrapCnt(scrapCnt)
                .createdAt(createdAt)
                .updatedAt(updatedAt)
                .photoUrlList(photoUrls) // 사진 URL 리스트 추가
                .build();
    }

    // 1. 전체 뉴스 조회 (10개씩 최신순)
    @Transactional(readOnly = true)
    public NewsPageResponseDto getAllNews(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size); // Spring Data JPA에서 페이지는 0부터 시작
        Page<News> newsPage = newsRepository.findAll(pageable);

        // 각 뉴스에 대한 NewsResponseDto 리스트 생성
        List<NewsResponseDto> newsList = newsPage.getContent().stream()
                .map(this::convertToDto) // convertToDto 메서드를 사용하여 변환
                .toList();

        return NewsPageResponseDto.builder()
                .news(newsList)
                .currentPage(page)
                .totalPages(newsPage.getTotalPages())
                .totalItems((int) newsPage.getTotalElements())
                .build();
    }

    @Transactional(readOnly = true)
    public NewsPageResponseDto getFilteredNews(Integer industryId, int page, int size, LocalDate ds, LocalDate de, String option) {
        Pageable pageable = PageRequest.of(page - 1, size); // Spring Data JPA에서 페이지는 0부터 시작합니다.
        LocalDateTime startDate = (ds != null) ? ds.atStartOfDay() : null;
        LocalDateTime endDate = (de != null) ? de.atTime(23, 59, 59) : null;

        LocalDateTime defaultStartDate = LocalDate.now().minusDays(7).atStartOfDay();
        LocalDateTime defaultEndDate = LocalDate.now().atTime(23, 59, 59);

        Page<News> newsPage;

        // 전체 조회 또는 특정 산업군 조회 로직
        if (industryId != null || (option != null && ("hot".equals(option) || "scrap".equals(option)))) {
            // hot이나 scrap 옵션이 있는 경우 동적으로 정렬하여 조회
            newsPage = newsRepository.findFilteredNews(industryId, startDate, endDate, option, pageable);
        } else {
            // 기본 조회 로직 (total)
            newsPage = newsRepository.findTotalFilteredNews(industryId, startDate, endDate, pageable);
        }

        List<NewsResponseDto> filteredNewsList = newsPage.getContent()
                .stream()
                .map(this::convertToDto)
                .toList();

        return NewsPageResponseDto.builder()
                .news(filteredNewsList)
                .currentPage(page)
                .totalPages(newsPage.getTotalPages())
                .totalItems((int) newsPage.getTotalElements())
                .build();
    }


    // 3. 뉴스 상세 조회
    @Transactional
    public NewsDetailResponseDto getNewsDetail(int userId, int newsId) {
        News news = newsRepository.findByNewsId(newsId);
        if (news == null) {
            // ErrorCode를 사용하여 표준화된 메시지로 커스텀 예외를 발생시킵니다.
            throw new NewscrabException(ErrorCode.NEWS_NOT_FOUND);
        }

        // 뉴스의 사진 정보를 조회합니다.
        List<NewsPhoto> photos = newsPhotoRepository.findByNews_NewsId(news.getNewsId());
        List<String> photoUrls = photos.stream()
                .map(NewsPhoto::getPhotoUrl)
                .toList();

        // 해당 유저가 해당 뉴스를 스크랩했는지 확인
        Scrap scrap = scrapRepository.findByUserUserIdAndNewsNewsId(userId, newsId).orElse(null);

        // 뉴스의 키워드 정보를 조회합니다.
        List<String> keywords = news.getNewsKeywords().stream()
                .map(NewsKeyword::getNewsKeywordName)
                .toList();

        // 관련 뉴스 객체 가져오기
        News relatedNews1 = news.getRelatedNews1();
        News relatedNews2 = news.getRelatedNews2();
        News relatedNews3 = news.getRelatedNews3();

        // 변환 메서드를 사용하여 News 객체를 NewsResponseDto로 변환
        NewsResponseDto relatedNewsDto1 = convertToDto(relatedNews1);
        NewsResponseDto relatedNewsDto2 = convertToDto(relatedNews2);
        NewsResponseDto relatedNewsDto3 = convertToDto(relatedNews3);

        // 뉴스 조회수 증가
        news.increaseView();

        // UserNewsRead 엔티티 생성 및 저장
        readNews(userId, newsId);

        // NewsDetailResponseDto 빌드하여 반환
        return NewsDetailResponseDto.builder()
                .newsId(news.getNewsId())
                .newsTitle(news.getNewsTitle())
                .industryId(news.getIndustry().getIndustryId())
                .newsContent(news.getNewsContent())
                .newsCompany(news.getNewsCompany())
                .newsPublishedAt(news.getNewsPublishedAt())
                .createdAt(news.getCreatedAt())
                .updatedAt(news.getUpdatedAt())
                .newsUrl(news.getNewsUrl())
                .view(news.getView())
                .scrap(news.getScrapCnt())
                .keywords(keywords)
                .scrapId(scrap == null ? null : scrap.getScrapId())
                .newsPhoto(photoUrls) // 사진 URL 리스트 추가
                .relatedNews1(relatedNewsDto1) // 관련 뉴스 1 객체
                .relatedNews2(relatedNewsDto2) // 관련 뉴스 2 객체
                .relatedNews3(relatedNewsDto3) // 관련 뉴스 3 객체
                .build();
    }

    // 4. 인기 뉴스 조회 (조회수 높은 순, 최근 1주일 이내)
    @Transactional(readOnly = true)
    public NewsPageResponseDto getHotNews(int page, int size) {
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusWeeks(1); // 현재 날짜로부터 1주일 전

        Pageable pageable = PageRequest.of(page - 1, size);
        Page<News> newsPage = newsRepository.findHotNews(oneWeekAgo, pageable);

        List<NewsResponseDto> newsList = newsPage.getContent().stream()
                .map(this::convertToDto) // convertToDto 메서드를 사용하여 변환
                .toList();

        return NewsPageResponseDto.builder()
                .news(newsList)
                .currentPage(page)
                .totalPages(newsPage.getTotalPages())
                .totalItems((int) newsPage.getTotalElements())
                .build();
    }

    // 5. 인기 스크랩 뉴스 조회 (스크랩 카운트 높은 순, 최근 1주일 이내)
    @Transactional(readOnly = true)
    public NewsPageResponseDto getHotScrapNews(int page, int size) {
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusWeeks(1); // 현재 날짜로부터 1주일 전

        Pageable pageable = PageRequest.of(page - 1, size);
        Page<News> newsPage = newsRepository.findHotScrapNews(oneWeekAgo, pageable);

        List<NewsResponseDto> newsList = newsPage.getContent().stream()
                .map(this::convertToDto) // convertToDto 메서드를 사용하여 변환
                .toList();

        return NewsPageResponseDto.builder()
                .news(newsList)
                .currentPage(page)
                .totalPages(newsPage.getTotalPages())
                .totalItems((int) newsPage.getTotalElements())
                .build();
    }


    // 6. 뉴스 좋아요 (찜) 기능
    @Transactional
    public void likeNews(int newsId, int userId) {
        // 뉴스와 사용자 정보 조회
        News news = newsRepository.findById(newsId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.NEWS_NOT_FOUND));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.USER_NOT_FOUND));

        UserNewsLike userNewsLike = UserNewsLike.builder()
                .user(user)
                .news(news)
                .createdAt(LocalDateTime.now())
                .build();

        if (userNewsLikeRepository.existsByUserAndNews(user, news)) {
            throw new NewscrabException(ErrorCode.LIKE_ALREADY_EXISTS);
        }

        userNewsLikeRepository.save(userNewsLike);

    }


    // 7. 뉴스 찜 목록 삭제
    @Transactional
    public void unlikeNews(int newsId, int userId) {
        News news = newsRepository.findById(newsId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.NEWS_NOT_FOUND));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.USER_NOT_FOUND));

        UserNewsLike like = userNewsLikeRepository.findByUserAndNews(user, news)
                .orElseThrow(() -> new NewscrabException(ErrorCode.LIKE_NOT_FOUND));

        userNewsLikeRepository.delete(like);
    }

    // 8. 뉴스 찜 여부 조회
    @Transactional(readOnly = true)
    public boolean isLiked(int newsId, int userId) {
        News news = newsRepository.findById(newsId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.NEWS_NOT_FOUND));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.USER_NOT_FOUND));

        return userNewsLikeRepository.existsByUserAndNews(user, news);
    }


    // 내부 메서드


    // 뉴스 조회 기록 저장
    @Transactional
    protected void readNews(int userId, int newsId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.USER_NOT_FOUND));
        News news = newsRepository.findById(newsId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.NEWS_NOT_FOUND));

        UserNewsRead userNewsRead = UserNewsRead.builder()
                .user(user)
                .news(news)
                .readtime(LocalDateTime.now())
                .build();

        userNewsReadRepository.save(userNewsRead);
    }

    // 뉴스 조회
    @Transactional(readOnly = true)
    public News getNewsByNewsId(int newsId) {
        News news = newsRepository.findById(newsId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.NEWS_NOT_FOUND));

        return news;
    }

    public NewsRecoResponseDto getRecommendNews ( int userId){
        //fast api에 요청보내서 추천뉴스 받아오기
        try {
            // 인코딩된 키워드를 포함한 URL 생성
            String url = String.format(host + "/api/v1/reco/recommend/list/%d", userId);
            log.info("Final request URL: {}", url);  // 요청 URL을 로그로 출력하여 확인

            // RestTemplate 사용
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<RecoListResponseDto> response = restTemplate.getForEntity(url, RecoListResponseDto.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                log.info("fetchRelatedNews response: {}", response.getBody());
                List<NewsResponseDto> user_base = response.getBody().getUser_base().stream()
                        .map(newsId -> convertToDto(newsRepository.findByNewsId(newsId)))
                        .toList();
                List<NewsResponseDto> item_base = response.getBody().getItem_base().stream()
                        .map(newsId -> convertToDto(newsRepository.findByNewsId(newsId)))
                        .toList();
                List<NewsResponseDto> latest = response.getBody().getLatest().stream()
                        .map(newsId -> convertToDto(newsRepository.findByNewsId(newsId)))
                        .toList();
                return new NewsRecoResponseDto(user_base, item_base, latest);
            } else {
                log.error("Failed to fetch related news");
                throw new RuntimeException("Failed to fetch related news");
            }
        } catch (Error e) {
            log.error("Encoding failed: {}", e.getMessage());
            throw new RuntimeException("URL encoding failed", e);
        }
    }
}