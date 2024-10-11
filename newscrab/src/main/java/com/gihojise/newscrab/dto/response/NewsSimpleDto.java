package com.gihojise.newscrab.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NewsSimpleDto {
    private int newsId;
    private String newsTitle;
    private String imageUrl;
    private String publishedAt;
}