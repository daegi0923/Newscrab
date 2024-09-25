package com.gihojise.newscrab.service;

import com.gihojise.newscrab.domain.News;
import com.gihojise.newscrab.domain.User;
import com.gihojise.newscrab.domain.Voca;
import com.gihojise.newscrab.dto.request.VocaAddRequestDto;
import com.gihojise.newscrab.dto.response.VocaListResponseDto;
import com.gihojise.newscrab.dto.response.VocaNewsResponseDto;
import com.gihojise.newscrab.dto.response.VocaResponseDto;
import com.gihojise.newscrab.exception.ErrorCode;
import com.gihojise.newscrab.exception.NewscrabException;
import com.gihojise.newscrab.repository.NewsRepository;
import com.gihojise.newscrab.repository.UserRepository;
import com.gihojise.newscrab.repository.VocaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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

    // 단어 목록 조회
    @Transactional(readOnly = true)
    public VocaListResponseDto getVocaList(int userId) {
        List<VocaResponseDto> vocaList = vocaRepository.findByUserUserId(userId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

        // VocaListResponseDto를 생성할 때 totalItems와 data를 명시적으로 설정
        return VocaListResponseDto.builder()
                .totalItems(vocaList.size())
                .data(vocaList)
                .build();
    }

    // 단어 상세 조회
    @Transactional(readOnly = true)
    public VocaResponseDto getVocaDetail(int userId, int vocaId) {
        Voca voca = vocaRepository.findById(vocaId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.VOCA_NOT_FOUND));

        if (userId != voca.getUser().getUserId()) {
            throw new NewscrabException(ErrorCode.VOCA_NOT_MATCH_USER);
        }

        return convertToDto(voca);
    }

    // 단어 추가
    @Transactional
    public void addVoca(VocaAddRequestDto vocaAddRequestDto, int userId) {
        // User 객체를 userId로 조회
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.USER_NOT_FOUND));

        // News 객체를 newsId로 조회
        News news = newsRepository.findById(vocaAddRequestDto.getNewsId())
                .orElseThrow(() -> new NewscrabException(ErrorCode.NEWS_NOT_FOUND));

        // 단어 연관 뉴스 추천 API 호출
        VocaNewsResponseDto responseDto = fetchRelatedNews(vocaAddRequestDto.getVocaName());

        // 연관 뉴스 1, 2, 3을 조회하여 News 객체로 변환
        News relatedNews1 = newsRepository.findById(responseDto.getRelatedNewsId1())
                .orElse(null); // 관련 뉴스가 없을 수도 있으므로 예외 대신 null 반환
        News relatedNews2 = newsRepository.findById(responseDto.getRelatedNewsId2())
                .orElse(null);
        News relatedNews3 = newsRepository.findById(responseDto.getRelatedNewsId3())
                .orElse(null);


        // Voca 엔티티 생성 및 저장
        Voca voca = Voca.builder()
                .news(news)
                .user(user) // 조회된 User 객체 설정
                .vocaName(vocaAddRequestDto.getVocaName())
                .vocaDesc(vocaAddRequestDto.getVocaDesc())
                .sentence(vocaAddRequestDto.getSentence())
                .industryId(vocaAddRequestDto.getIndustryId())
                .relatedNews1(relatedNews1)
                .relatedNews2(relatedNews2)
                .relatedNews3(relatedNews3)
                .build();

        vocaRepository.save(voca);
    }

    // 연관 뉴스 API 호출 메소드
    @Transactional(readOnly = true)
    public VocaNewsResponseDto fetchRelatedNews(String keyword) {
        try {
            // 키워드를 URL 인코딩 처리
            String encodedKeyword = URLEncoder.encode(keyword, "UTF-8");
            log.info("fetchRelatedNews: {}", encodedKeyword);

            // 인코딩된 키워드를 포함한 URL 생성
            String url = String.format("https://newscrab.duckdns.org/api/v1/reco/voca/search_related_news?keyword=%s", encodedKeyword);
            log.info("Final request URL: {}", url);  // 요청 URL을 로그로 출력하여 확인

            // RestTemplate 사용
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<VocaNewsResponseDto> response = restTemplate.getForEntity(url, VocaNewsResponseDto.class);

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
        voca.update(vocaAddRequestDto.getVocaName(),
                vocaAddRequestDto.getVocaDesc(),
                vocaAddRequestDto.getSentence(),
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




}
