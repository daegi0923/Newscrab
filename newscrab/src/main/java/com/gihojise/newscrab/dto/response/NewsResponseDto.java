package com.gihojise.newscrab.dto.response;

import com.gihojise.newscrab.domain.News;
import com.gihojise.newscrab.domain.NewsPhoto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NewsResponseDto {

    private int newsId;
    private String newsTitle;
    private int industryId;
    private String newsContent;
    private LocalDateTime newsPublishedAt;
    private String newsCompany;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String newsUrl;
    private int view;
    private int scrapCnt;
    private List<String> photoUrlList;

    public NewsResponseDto(News news){
        this.newsId = news.getNewsId();
        this.newsTitle = news.getNewsTitle();
        this.industryId = news.getIndustry().getIndustryId();
        this.newsContent = news.getNewsContent();
        this.newsPublishedAt = news.getNewsPublishedAt();
        this.newsCompany = news.getNewsCompany();
        this.createdAt = news.getCreatedAt();
        this.updatedAt = news.getUpdatedAt();
        this.newsUrl = news.getNewsUrl();
        this.view = news.getView();
        this.scrapCnt = news.getScrapCnt();
        this.photoUrlList = news.getNewsPhotos().stream()
                .map(NewsPhoto::getPhotoUrl)
                .toList();
    }
}