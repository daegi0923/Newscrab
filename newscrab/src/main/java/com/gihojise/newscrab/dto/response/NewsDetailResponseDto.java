package com.gihojise.newscrab.dto.response;

import com.gihojise.newscrab.domain.News;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class NewsDetailResponseDto {

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
    private int scrap;
    private List<String> newsPhoto;
    private News relatedNews1;
    private News relatedNews2;
    private News relatedNews3;
}
