package com.gihojise.newscrab.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class NewsPageResponseDto {

    private List<NewsResponseDto> news;
    private int currentPage;
    private int totalPages;
    private int totalItems;
}
