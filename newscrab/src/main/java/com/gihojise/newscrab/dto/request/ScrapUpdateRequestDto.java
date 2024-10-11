package com.gihojise.newscrab.dto.request;


import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ScrapUpdateRequestDto {

    private int newsId;
    private String comment;
    private String scrapSummary;
    private List<HighlightRequestDto> highlights;
}
