package com.gihojise.newscrab.service;

import com.gihojise.newscrab.domain.*;
import com.gihojise.newscrab.dto.domain.HighlightDto;
import com.gihojise.newscrab.dto.domain.VocaDto;
import com.gihojise.newscrab.dto.request.ScrapAddRequestDto;
import com.gihojise.newscrab.dto.request.ScrapUpdateRequestDto;
import com.gihojise.newscrab.dto.response.ScrapListResponseDto;
import com.gihojise.newscrab.dto.response.ScrapResponseDto;
import com.gihojise.newscrab.exception.ErrorCode;
import com.gihojise.newscrab.exception.NewscrabException;
import com.gihojise.newscrab.repository.GrassRepository;
import com.gihojise.newscrab.repository.NewsRepository;
import com.gihojise.newscrab.repository.ScrapRepository;
import com.gihojise.newscrab.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScrapService {

    private final ScrapRepository scrapRepository;
    private final UserRepository userRepository;
    private final NewsRepository newsRepository;

    private final HighlightService highlightService;
    private final GrassRepository grassRepository;

    // 1. 스크랩 목록 조회
    @Transactional(readOnly = true)
    public ScrapListResponseDto getAllScraps(int userId) {
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
                .totalItems(scrapRepository.findByUserUserId(userId).size())
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

        List<HighlightDto> highlightList = highlightService.getAllHighlights(scrapId);

        return ScrapResponseDto.builder()
                .scrapId(scrap.getScrapId())
                .newsId(news.getNewsId())
                .newsTitle(news.getNewsTitle())
                .photolist(news.getNewsPhotos() != null ? news.getNewsPhotos().stream()
                        .map(newsPhoto -> newsPhoto.getPhotoUrl())
                        .toList() : Collections.emptyList())
                .scrapSummary(scrap.getScrapSummary())
                .comment(scrap.getComment())
                .highlightList(highlightList)
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
                                .industryId(voca.getIndustryId())
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
    public Scrap addScrap(int userId, ScrapAddRequestDto scrapAddRequestDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.USER_NOT_FOUND));

        News news = newsRepository.findById(scrapAddRequestDto.getNewsId())
                .orElseThrow(() -> new NewscrabException(ErrorCode.NEWS_NOT_FOUND));

        if (scrapRepository.findByUserUserIdAndNewsNewsId(userId, scrapAddRequestDto.getNewsId()).isPresent()) {
            throw new NewscrabException(ErrorCode.SCRAP_ALREADY_EXIST);
        }

        Scrap scrap = Scrap.builder()
                .user(user)
                .news(news)
                .scrapSummary(scrapAddRequestDto.getScrapSummary())
                .comment(scrapAddRequestDto.getComment())
                .highlights(Collections.emptyList())
                .build();

        scrap = scrapRepository.save(scrap);

        if (scrapAddRequestDto.getHighlights() != null && !scrapAddRequestDto.getHighlights().isEmpty()) {
            Scrap finalScrap = scrap;
            List<Highlight> highlights = scrapAddRequestDto.getHighlights().stream()
                    .map(highlightDto -> new Highlight(
                            finalScrap,  // Now that Scrap is persisted, associate it
                            highlightDto.getStartPos(),
                            highlightDto.getEndPos(),
                            highlightDto.getColor()))
                    .collect(Collectors.toList());

            scrap.setHighlights(highlights);
        }

        // 잔디 추가 로직
        // 현재 날짜 추출
        LocalDate now = LocalDate.now();

        // 해당 유저가 해당 날짜의 grass 테이블에 데이터가 있는지 확인
        List<Grass> grasses = grassRepository.findAllByUser_UserId(userId);
        Optional<Grass> todayGrass = grasses.stream()
                .filter(grass -> grass.getCreatedAt().toLocalDate().isEqual(now))
                .findFirst();

        if (todayGrass.isPresent()) {
            // 데이터가 있으면 count 증가
            Grass grass = todayGrass.get();
            grass.increaseCount();
            grassRepository.save(grass);
        } else {
            // 데이터가 없으면 새로운 Grass 생성
            Grass newGrass = Grass.builder()
                    .user(user)
                    .count(1)  // 기본 count 값을 설정
                    .build();
            grassRepository.save(newGrass);
        }

        // 해당 뉴스 스크랩 횟수 증가
        news.increaseScrapCnt();

        return scrap;

    }

    // 4. 스크랩 수정
    @Transactional
    public void updateScrap(int userId, int scrapId, ScrapUpdateRequestDto scrapUpdateRequestDto) {
        Scrap scrap = scrapRepository.findById(scrapId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.SCRAP_NOT_FOUND));

        if (scrap.getUser().getUserId() != userId) {
            throw new NewscrabException(ErrorCode.USER_NOT_MATCH);
        }


        // 새로운 하이라이트를 생성
        List<Highlight> newHighlights = scrapUpdateRequestDto.getHighlights() != null ?
        scrapUpdateRequestDto.getHighlights().stream()
                .map(highlightDto -> new Highlight(
                        scrap,  // Now that Scrap is persisted, associate it
                        highlightDto.getStartPos(),
                        highlightDto.getEndPos(),
                        highlightDto.getColor()))
                .collect(Collectors.toList()) : null;

        // 스크랩을 업데이트할 때, 기존 하이라이트를 대체한다.
        scrap.update(scrapUpdateRequestDto.getScrapSummary(), scrapUpdateRequestDto.getComment(), newHighlights);

        // 변경 사항을 저장
        scrapRepository.save(scrap);

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
