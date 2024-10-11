package com.gihojise.newscrab.service;

import com.gihojise.newscrab.domain.News;
import com.gihojise.newscrab.domain.User;
import com.gihojise.newscrab.domain.Voca;
import com.gihojise.newscrab.dto.request.VocaAddRequestDto;
import com.gihojise.newscrab.dto.request.VocaListAddRequestDto;
import com.gihojise.newscrab.dto.response.*;
import com.gihojise.newscrab.exception.ErrorCode;
import com.gihojise.newscrab.exception.NewscrabException;
import com.gihojise.newscrab.repository.NewsRepository;
import com.gihojise.newscrab.repository.UserRepository;
import com.gihojise.newscrab.repository.VocaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class VocaService {

    private final VocaRepository vocaRepository;
    private final NewsRepository newsRepository;
    private final UserRepository userRepository;
    private final VocaAsyncService vocaAsyncService;

    @Value("${FAST_API_HOST}")
    String host;


    // 단어 목록 조회
    @Transactional(readOnly = true)
    public VocaListResponseDto getVocaList(int userId) {
        List<VocaSimpleResponseDto> vocaList = vocaRepository.findByUserUserId(userId).stream()
                .map(this::convertToSimpleDto)
                .collect(Collectors.toList());

        // VocaListResponseDto를 생성할 때 totalItems와 data를 명시적으로 설정
        return VocaListResponseDto.builder()
                .totalItems(vocaList.size())
                .data(vocaList)
                .build();
    }

    // 단어 상세 조회
    @Transactional(readOnly = true)
    public VocaSimpleResponseDto getVocaDetail(int userId, int vocaId) {
        Voca voca = vocaRepository.findById(vocaId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.VOCA_NOT_FOUND));

        if (userId != voca.getUser().getUserId()) {
            throw new NewscrabException(ErrorCode.VOCA_NOT_MATCH_USER);
        }

        return convertToSimpleDto(voca);
    }

    // 단어 추가
    @Transactional
    public void addVocaList(VocaListAddRequestDto vocaListAddRequestDto, int userId) {
        // User 객체를 userId로 조회
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.USER_NOT_FOUND));

        // 단어 리스트를 순회하면서 각각의 단어 처리
        for (VocaAddRequestDto vocaAddRequestDto : vocaListAddRequestDto.getVocaAddList()) {

            if (vocaAddRequestDto.getIndustryId() == null) {
                throw new NewscrabException(ErrorCode.INDUSTRY_NULL);
            }

            // News 객체를 newsId로 조회
            News news = newsRepository.findById(vocaAddRequestDto.getNewsId())
                    .orElseThrow(() -> new NewscrabException(ErrorCode.NEWS_NOT_FOUND));

            // Voca 엔티티 생성 및 저장
            Voca voca = Voca.builder()
                    .news(news)
                    .user(user) // 조회된 User 객체 설정
                    .vocaName(vocaAddRequestDto.getVocaName())
                    .vocaDesc(vocaAddRequestDto.getVocaDesc())
                    .industryId(vocaAddRequestDto.getIndustryId())
                    .build();

            // Voca 엔티티 저장
            vocaRepository.save(voca);

            // 비동기적으로 외부 API 호출 및 관련 뉴스 업데이트
            vocaAsyncService.fetchAndSaveRelatedNews(voca, vocaAddRequestDto);
        }

        // 여기서 빠르게 리턴하여 프론트엔드에 즉시 응답을 보냄
    }



    // 연관 뉴스 API 호출 메소드
    @Transactional(readOnly = true)
    public VocaNewsResponseDto fetchRelatedNews(String keyword) {
        try {
            // 키워드를 URL 인코딩 처리
            String encodedKeyword = URLEncoder.encode(keyword, "UTF-8");
            log.info("fetchRelatedNews: {}", encodedKeyword);

            // 인코딩된 키워드를 포함한 URL 생성
//            String url = String.format(host+"/api/v1/reco/voca/search_related_news?keyword=%s", encodedKeyword);

            // 인코딩 안 한 키워드로 요청
            String url = String.format(host+"/api/v1/reco/voca/search_related_news?keyword=%s", keyword);
            log.info("Final request URL: {}", url);  // 요청 URL을 로그로 출력하여 확인

            // RestTemplate 사용
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<VocaNewsResponseDto> response = restTemplate.getForEntity(url, VocaNewsResponseDto.class);

            System.out.println(response);

            if (response.getStatusCode() == HttpStatus.OK) {
                log.info("fetchRelatedNews response: {}", response.getBody());
                return response.getBody();
            } else {
                log.error("Failed to fetch related news");
                throw new RuntimeException("Failed to fetch related news");
            }
        } catch (UnsupportedEncodingException e) {
            log.error("Encoding failed: {}", e.getMessage());
            throw new RuntimeException("URL encoding failed", e);
        } catch (HttpClientErrorException.NotFound e) {
            log.warn("키워드 '{}'에 대한 관련 뉴스를 찾을 수 없습니다.", keyword);
            throw new NewscrabException(ErrorCode.NEWS_NOT_FOUND_BY_KEYWORD);
        } catch (Exception e) {
            log.error("외부 API 호출 중 오류 발생: {}", e.getMessage());
            throw new NewscrabException(ErrorCode.EXTERNAL_API_ERROR);
        }
    }


    // 단어 수정
    @Transactional
    public void updateVoca(int userId, int vocaId, VocaAddRequestDto vocaAddRequestDto) {
        Voca voca = vocaRepository.findById(vocaId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.VOCA_NOT_FOUND));

        // voca 의 userId와 다르면 예외
        if (voca.getUser().getUserId() != userId) {
            throw new NewscrabException(ErrorCode.VOCA_NOT_MATCH_USER);
        }

        // update
        voca.update(
                newsRepository.findById(vocaAddRequestDto.getNewsId()).orElseThrow(() -> new NewscrabException(ErrorCode.NEWS_NOT_FOUND)),
                vocaAddRequestDto.getVocaName(),
                vocaAddRequestDto.getVocaDesc(),
                voca.getSentence(),
                vocaAddRequestDto.getIndustryId());
    }

    // 단어 삭제
    @Transactional
    public void deleteVoca(int userId, int vocaId) {
        Voca voca = vocaRepository.findById(vocaId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.VOCA_NOT_FOUND));

        if (voca.getUser().getUserId() != userId) {
            throw new NewscrabException(ErrorCode.VOCA_NOT_MATCH_USER);
        }

        vocaRepository.delete(voca);
    }

    // Voca를 VocaResponseDto로 변환하는 메서드
    private VocaResponseDto convertToDto(Voca voca) {
        return VocaResponseDto.builder()
                .vocaId(Optional.ofNullable(voca.getVocaId()).orElse(0)) // Null-safe 처리
                .vocaName(Optional.ofNullable(voca.getVocaName()).orElse("")) // Null-safe 처리
                .vocaDesc(Optional.ofNullable(voca.getVocaDesc()).orElse("")) // Null-safe 처리
                .sentence(Optional.ofNullable(voca.getSentence()).orElse("")) // Null-safe 처리
                .industryId(Optional.ofNullable(voca.getIndustryId()).orElse(0)) // Null-safe 처리
                .originNewsId(Optional.ofNullable(voca.getNews()).map(News::getNewsId).orElse(0)) // Null-safe 처리
                .relatedNewsId1(Optional.ofNullable(voca.getRelatedNews1()).map(News::getNewsId).orElse(0)) // Null-safe 처리
                .relatedNewsId2(Optional.ofNullable(voca.getRelatedNews2()).map(News::getNewsId).orElse(0)) // Null-safe 처리
                .relatedNewsId3(Optional.ofNullable(voca.getRelatedNews3()).map(News::getNewsId).orElse(0)) // Null-safe 처리
                .createdAt(Optional.ofNullable(voca.getCreatedAt()).orElse(null)) // Null-safe 처리
                .updatedAt(Optional.ofNullable(voca.getUpdatedAt()).orElse(null)) // Null-safe 처리
                .build();
    }

    private VocaSimpleResponseDto convertToSimpleDto(Voca voca) {
        return VocaSimpleResponseDto.builder()
                .vocaId(voca.getVocaId())
                .vocaName(voca.getVocaName())
                .vocaDesc(Optional.ofNullable(voca.getVocaDesc()).orElse("No description available"))
                .sentence(Optional.ofNullable(voca.getSentence()).orElse("Not updated yet..."))
                .industryId(Optional.ofNullable(voca.getIndustryId()).orElse(0)) // 기본값 처리
                .originNewsId(Optional.ofNullable(voca.getNews()).map(News::getNewsId).orElse(0)) // 기본값 처리
                .originNewsTitle(Optional.ofNullable(voca.getNews()).map(News::getNewsTitle).orElse("No title available"))
                .originNewsUrl(Optional.ofNullable(voca.getNews()).map(News::getNewsUrl).orElse("No URL available"))
                .originNewsImgUrl(Optional.ofNullable(voca.getNews())
                        .flatMap(news -> news.getNewsPhotos().stream().findFirst())
                        .map(photo -> photo.getPhotoUrl())
                        .orElse("No image available")) // 이미지가 없을 때 기본값 설정
                .originNewsPublishedAt(Optional.ofNullable(voca.getNews())
                        .map(News::getNewsPublishedAt)
                        .map(Object::toString)
                        .orElse("No date available"))
                .relatedNews1(convertToNewsSimpleDto(voca.getRelatedNews1())) // 관련 뉴스가 없으면 null 전달됨
                .relatedNews2(convertToNewsSimpleDto(voca.getRelatedNews2())) // 관련 뉴스가 없으면 null 전달됨
                .relatedNews3(convertToNewsSimpleDto(voca.getRelatedNews3())) // 관련 뉴스가 없으면 null 전달됨
                .createdAt(Optional.ofNullable(voca.getCreatedAt()).orElse(null))
                .updatedAt(Optional.ofNullable(voca.getUpdatedAt()).orElse(null))
                .build();
    }

    // News 객체를 NewsSimpleDto로 변환하는 헬퍼 메서드
    private NewsSimpleDto convertToNewsSimpleDto(News news) {
        if (news == null) {
            return null; // null 처리
        }
        return NewsSimpleDto.builder()
                .newsId(news.getNewsId())
                .newsTitle(Optional.ofNullable(news.getNewsTitle()).orElse("No title available"))
                .imageUrl(Optional.ofNullable(news.getNewsPhotos())
                        .flatMap(photos -> photos.stream().findFirst())
                        .map(photo -> photo.getPhotoUrl())
                        .orElse("No image available"))
                .publishedAt(Optional.ofNullable(news.getNewsPublishedAt())
                        .map(Object::toString)
                        .orElse("No date available"))
                .build();
    }

}
