package com.gihojise.newscrab.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
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
}