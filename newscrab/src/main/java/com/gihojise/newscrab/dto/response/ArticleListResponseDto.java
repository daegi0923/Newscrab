package com.gihojise.newscrab.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ArticleListResponseDto {
    private List<ArticleResponseDto> articleList;
    private int totalItems;
}
