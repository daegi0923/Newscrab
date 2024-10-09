package com.gihojise.newscrab.service;

import com.gihojise.newscrab.domain.News;
import com.gihojise.newscrab.domain.Voca;
import com.gihojise.newscrab.dto.request.VocaAddRequestDto;
import com.gihojise.newscrab.dto.response.VocaNewsResponseDto;
import com.gihojise.newscrab.exception.ErrorCode;
import com.gihojise.newscrab.exception.NewscrabException;
import com.gihojise.newscrab.repository.NewsRepository;
import com.gihojise.newscrab.repository.VocaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;

@Slf4j
@Service
@RequiredArgsConstructor
public class VocaAsyncService {

    private final VocaRepository vocaRepository;
    private final NewsRepository newsRepository;

    @Value("${FAST_API_HOST}")
    String host;

    @Async
    @Transactional // 새로운 트랜잭션에서 처리
    public void fetchAndSaveRelatedNews(Voca voca, VocaAddRequestDto vocaAddRequestDto) {
        log.info("Fetching related news for voca: {}", voca.getVocaId());

        // 외부 API 호출
        VocaNewsResponseDto responseDto = fetchRelatedNews(vocaAddRequestDto.getVocaName());

        log.info("Fetched related news: {}", responseDto);

        // 연관 뉴스 1, 2, 3을 조회하여 News 객체로 변환
        News relatedNews1 = newsRepository.findById(responseDto.getRelatedNewsId1()).orElse(null);
        News relatedNews2 = newsRepository.findById(responseDto.getRelatedNewsId2()).orElse(null);
        News relatedNews3 = newsRepository.findById(responseDto.getRelatedNewsId3()).orElse(null);

        String sentence = responseDto.getImportantSentence();

        // Voca 엔티티 업데이트
        voca.updateAsyncData(relatedNews1, relatedNews2, relatedNews3, sentence);

        log.info("Updated voca with related news: {} - {}, {}, {}",
                relatedNews1 != null ? relatedNews1.getNewsId() : "null",
                relatedNews2 != null ? relatedNews2.getNewsId() : "null",
                relatedNews3 != null ? relatedNews3.getNewsId() : "null");

        // 변경된 Voca 저장
        vocaRepository.save(voca);

        log.info("Voca saved with updated related news.");
    }


    private VocaNewsResponseDto fetchRelatedNews(String keyword) {
        try {
            String url = String.format(host+"/api/v1/reco/voca/search_related_news?keyword=%s", keyword);
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<VocaNewsResponseDto> response = restTemplate.getForEntity(url, VocaNewsResponseDto.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                return response.getBody();
            } else {
                throw new NewscrabException(ErrorCode.EXTERNAL_API_ERROR);
            }
        } catch (Exception e) {
            throw new NewscrabException(ErrorCode.EXTERNAL_API_ERROR);
        }
    }
}
