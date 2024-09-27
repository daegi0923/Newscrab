package com.gihojise.newscrab.service;

import com.gihojise.newscrab.domain.News;
import com.gihojise.newscrab.domain.Scrap;
import com.gihojise.newscrab.domain.User;
import com.gihojise.newscrab.dto.domain.HighlightDto;
import com.gihojise.newscrab.dto.domain.VocaDto;
import com.gihojise.newscrab.dto.request.ScrapAddRequestDto;
import com.gihojise.newscrab.dto.response.ScrapListResponseDto;
import com.gihojise.newscrab.dto.response.ScrapResponseDto;
import com.gihojise.newscrab.exception.ErrorCode;
import com.gihojise.newscrab.exception.NewscrabException;
import com.gihojise.newscrab.repository.NewsRepository;
import com.gihojise.newscrab.repository.ScrapRepository;
import com.gihojise.newscrab.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class ScrapService {

    private final ScrapRepository scrapRepository;
    private final UserRepository userRepository;
    private final NewsRepository newsRepository;

    // 1. 스크랩 목록 조회
    @Transactional(readOnly = true)
    public ScrapListResponseDto getAllScraps(int userId, int page, int size) {
        // 페이징 안 함

        return ScrapListResponseDto.builder()
                .data(scrapRepository.findByUserUserId(userId).stream()
                        .map(scrap -> ScrapResponseDto.builder()
                                .scrapId(scrap.getScrapId())
                                .newsId(scrap.getNews().getNewsId())
                                .newsTitle(scrap.getNews().getNewsTitle())
                                .newsContent(scrap.getNews().getNewsContent())
                                .photolist(scrap.getNews().getNewsPhotos().stream()
                                        .map(newsPhoto -> newsPhoto.getPhotoUrl())
                                        .toList())
                                .scrapSummary(scrap.getScrapSummary())
                                .comment(scrap.getComment())
                                .createdAt(scrap.getCreatedAt())
                                .updatedAt(scrap.getUpdatedAt())
                                .industryId(scrap.getNews().getIndustry().getIndustryId())
                                .view(scrap.getNews().getView())
                                .scrapCnt(scrap.getNews().getScrapCnt())
                                .newsCompany(scrap.getNews().getNewsCompany())
                                .build())
                        .toList())
                .totalItems(scrapRepository.findAll().size())
                .build();
    }

    // 2. 스크랩 상세 조회
    @Transactional(readOnly = true)
    public ScrapResponseDto getScrapDetail(int userId, int scrapId) {
        Scrap scrap = scrapRepository.findById(scrapId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.SCRAP_NOT_FOUND));

        News news = newsRepository.findById(scrap.getNews() != null ? scrap.getNews().getNewsId() : 0)
                .orElseThrow(() -> new NewscrabException(ErrorCode.NEWS_NOT_FOUND));

        if (scrap.getUser().getUserId() != userId) {
            throw new NewscrabException(ErrorCode.USER_NOT_MATCH);
        }

        return ScrapResponseDto.builder()
                .scrapId(scrap.getScrapId())
                .newsId(news.getNewsId())
                .newsTitle(news.getNewsTitle())
                .photolist(news.getNewsPhotos() != null ? news.getNewsPhotos().stream()
                        .map(newsPhoto -> newsPhoto.getPhotoUrl())
                        .toList() : Collections.emptyList())
                .scrapSummary(scrap.getScrapSummary())
                .comment(scrap.getComment())
                .createdAt(scrap.getCreatedAt())
                .updatedAt(scrap.getUpdatedAt())
                .vocalist(news.getVocas() != null ? news.getVocas().stream()
                        .map(voca -> VocaDto.builder()
                                .vocaId(voca.getVocaId() != null ? voca.getVocaId() : null)
                                .newsId(voca.getNews().getNewsId())
                                .userId(voca.getUser().getUserId())
                                .vocaName(voca.getVocaName())
                                .vocaDesc(voca.getVocaDesc())
                                .originNewsId(voca.getNews().getNewsId())
                                .sentence(voca.getSentence())
                                .createdAt(voca.getCreatedAt())
                                .updatedAt(voca.getUpdatedAt())
                                .relatedNewsId1(null)
                                .relatedNewsId2(null)
                                .relatedNewsId3(null)
                                .build())
                        .toList() : Collections.emptyList())
                .newsContent(news.getNewsContent())
                .highlightList(scrap.getHighlights() != null ? scrap.getHighlights().stream()
                        .map(highlight -> HighlightDto.builder()
                                .highlightId(highlight.getHighlightId())
                                .startPos(highlight.getStartPos())
                                .endPos(highlight.getEndPos())
                                .color(highlight.getColor())
                                .build())
                        .toList() : Collections.emptyList())
                .industryId(news.getIndustry() != null ? news.getIndustry().getIndustryId() : null)
                .view(news.getView())
                .scrapCnt(news.getScrapCnt())
                .newsCompany(news.getNewsCompany())
                .build();
    }

    // 3. 스크랩 추가
    @Transactional
    public void addScrap(int userId, ScrapAddRequestDto scrapAddRequestDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.USER_NOT_FOUND));

        News news = newsRepository.findById(scrapAddRequestDto.getNewsId())
                .orElseThrow(() -> new NewscrabException(ErrorCode.NEWS_NOT_FOUND));

        Scrap scrap = Scrap.builder()
                .user(user)
                .news(news)
                .scrapSummary(scrapAddRequestDto.getScrapSummary())
                .comment(scrapAddRequestDto.getComment())
                .build();

        scrapRepository.save(scrap);

    }

    // 4. 스크랩 수정
    @Transactional
    public void updateScrap(int userId, int scrapId, ScrapAddRequestDto scrapAddRequestDto) {
        Scrap scrap = scrapRepository.findById(scrapId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.SCRAP_NOT_FOUND));

        if (scrap.getUser().getUserId() != userId) {
            throw new NewscrabException(ErrorCode.USER_NOT_MATCH);
        }

        scrap.update(scrapAddRequestDto.getScrapSummary(), scrapAddRequestDto.getComment());
    }

    // 5. 스크랩 삭제
    @Transactional
    public void deleteScrap(int userId, int scrapId) {
        Scrap scrap = scrapRepository.findById(scrapId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.SCRAP_NOT_FOUND));

        if (scrap.getUser().getUserId() != userId) {
            throw new NewscrabException(ErrorCode.USER_NOT_MATCH);
        }

        scrapRepository.delete(scrap);
    }
}
