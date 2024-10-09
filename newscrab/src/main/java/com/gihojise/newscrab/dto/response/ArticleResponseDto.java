package com.gihojise.newscrab.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ArticleResponseDto {
    private int articleId;
    private String name;
    private int likeCnt;
    private ScrapResponseDto scrapResponseDto;
}
