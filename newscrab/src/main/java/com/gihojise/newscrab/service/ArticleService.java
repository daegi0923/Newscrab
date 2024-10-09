package com.gihojise.newscrab.service;

import com.gihojise.newscrab.domain.*;
import com.gihojise.newscrab.dto.domain.HighlightDto;
import com.gihojise.newscrab.dto.domain.VocaDto;
import com.gihojise.newscrab.dto.response.ArticleListResponseDto;
import com.gihojise.newscrab.dto.response.ArticleResponseDto;
import com.gihojise.newscrab.dto.response.ScrapResponseDto;
import com.gihojise.newscrab.exception.ErrorCode;
import com.gihojise.newscrab.exception.NewscrabException;
import com.gihojise.newscrab.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ScrapRepository scrapRepository;
    private final UserRepository userRepository;
    private final ArticleRepository articleRepository;
    private final UserArticleLikeRepository userArticleLikeRepository;

    // 스크랩 공유게시글 목록 조회 (프론트: 페이지네이션 안할거임! 검색으로 조절할게요)
    @Transactional(readOnly = true)
    public ArticleListResponseDto getArticleList() {

        return ArticleListResponseDto.builder()
                .articleList(
                        articleRepository.findAll().stream()
                                .map(article -> ArticleResponseDto.builder()
                                        .articleId(article.getArticleId())
                                        .name(article.getScrap().getUser().getName())
                                        .likeCnt(article.getLikeCnt())
                                        .scrapResponseDto(ScrapResponseDto.builder()
                                                .scrapId(article.getScrap().getScrapId())
                                                .newsId(article.getScrap().getNews().getNewsId())
                                                .newsTitle(article.getScrap().getNews().getNewsTitle())
                                                .photolist(article.getScrap().getNews().getNewsPhotos() != null ? article.getScrap().getNews().getNewsPhotos().stream()
                                                        .map(newsPhoto -> newsPhoto.getPhotoUrl())
                                                        .toList() : Collections.emptyList())
                                                .scrapSummary(article.getScrap().getScrapSummary())
                                                .comment(article.getScrap().getComment())
                                                .highlightList(article.getScrap().getHighlights() != null ? article.getScrap().getHighlights().stream()
                                                        .map(highlight -> HighlightDto.builder()
                                                                .highlightId(highlight.getHighlightId())
                                                                .startPos(highlight.getStartPos())
                                                                .endPos(highlight.getEndPos())
                                                                .color(highlight.getColor())
                                                                .build())
                                                        .toList() : Collections.emptyList())
                                                .createdAt(article.getScrap().getCreatedAt())
                                                .updatedAt(article.getScrap().getUpdatedAt())
                                                .vocalist(article.getScrap().getNews().getVocas() != null ? article.getScrap().getNews().getVocas().stream()
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
                                                .newsContent(article.getScrap().getNews().getNewsContent())
                                                .highlightList(article.getScrap().getHighlights() != null ? article.getScrap().getHighlights().stream()
                                                        .map(highlight -> HighlightDto.builder()
                                                                .highlightId(highlight.getHighlightId())
                                                                .startPos(highlight.getStartPos())
                                                                .endPos(highlight.getEndPos())
                                                                .color(highlight.getColor())
                                                                .build())
                                                        .toList() : Collections.emptyList())
                                                .industryId(article.getScrap().getNews().getIndustry() != null ? article.getScrap().getNews().getIndustry().getIndustryId() : null)
                                                .view(article.getScrap().getNews().getView())
                                                .scrapCnt(article.getScrap().getNews().getScrapCnt())
                                                .newsCompany(article.getScrap().getNews().getNewsCompany())
                                                .build())
                                        .build())
                                .toList())
                .build();
    }

    // 스크랩 공유게시글 상세 조회 (프론트: 스크랩 상세조회에서 다른사람스크랩보기 누르면 해당뉴스id로 필터링해가지고 게시글 보이도록)
    @Transactional(readOnly = true)
    public ArticleResponseDto getArticleDetail(int articleId) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.ARTICLE_NOT_FOUND));

        Scrap scrap = article.getScrap();
        News news = scrap.getNews();

        return ArticleResponseDto.builder()
                .articleId(article.getArticleId())
                .name(article.getScrap().getUser().getName())
                .likeCnt(article.getLikeCnt())
                .scrapResponseDto(ScrapResponseDto.builder()
                        .scrapId(scrap.getScrapId())
                        .newsId(news.getNewsId())
                        .newsTitle(news.getNewsTitle())
                        .photolist(news.getNewsPhotos() != null ? news.getNewsPhotos().stream()
                                .map(newsPhoto -> newsPhoto.getPhotoUrl())
                                .toList() : Collections.emptyList())
                        .scrapSummary(scrap.getScrapSummary())
                        .comment(scrap.getComment())
                        .highlightList(scrap.getHighlights() != null ? scrap.getHighlights().stream()
                                .map(highlight -> HighlightDto.builder()
                                        .highlightId(highlight.getHighlightId())
                                        .startPos(highlight.getStartPos())
                                        .endPos(highlight.getEndPos())
                                        .color(highlight.getColor())
                                        .build())
                                .toList() : Collections.emptyList())
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
                        .build())
                .build();
    }
    // 스크랩 공유게시글 추가
    @Transactional
    public void addArticle(int userId, int scrapId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.USER_NOT_FOUND));

        Scrap scrap = scrapRepository.findById(scrapId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.SCRAP_NOT_FOUND));

        if (scrap.getUser().getUserId() != userId) {
            throw new NewscrabException(ErrorCode.USER_NOT_MATCH);
        }

        Article article = Article.builder()
                .user(user)
                .scrap(scrap)
                .likeCnt(0)
                .build();

        articleRepository.save(article);
    }

    // 스크랩 공유게시글 삭제
    @Transactional
    public void deleteArticle(int userId, int articleId) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.ARTICLE_NOT_FOUND));

        if (article.getUser().getUserId() != userId) {
            throw new NewscrabException(ErrorCode.USER_NOT_MATCH);
        }

        articleRepository.delete(article);
        
    }
    

    // 스크랩 좋아요
    @Transactional
    public void likeArticle(int userId, int articleId) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.ARTICLE_NOT_FOUND));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.USER_NOT_FOUND));

        UserArticleLike userArticleLike = UserArticleLike.builder()
                .user(user)
                .article(article)
                .createdAt(LocalDateTime.now())
                .build();

        // 이미 좋아요 눌렀는지 확인
        if (userArticleLikeRepository.existsByUser_UserIdAndArticle_ArticleId(userId, articleId)) {
            throw new NewscrabException(ErrorCode.USER_ARTICLE_LIKE_ALREADY_EXIST);
        }

        userArticleLikeRepository.save(userArticleLike);
        article.addLikeCnt();
        
    }
    
    // 좋아요 취소
    @Transactional
    public void cancelLikeArticle(int userId, int articleId) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.ARTICLE_NOT_FOUND));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NewscrabException(ErrorCode.USER_NOT_FOUND));

        UserArticleLike userArticleLike = userArticleLikeRepository.findByUserAndArticle(user, article)
                .orElseThrow(() -> new NewscrabException(ErrorCode.USER_ARTICLE_LIKE_NOT_FOUND));

        article.removeLikeCnt();
        userArticleLikeRepository.delete(userArticleLike);

    }
}
