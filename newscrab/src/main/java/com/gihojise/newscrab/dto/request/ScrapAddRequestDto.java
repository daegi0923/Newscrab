package com.gihojise.newscrab.dto.request;


import com.gihojise.newscrab.dto.domain.HighlightDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ScrapAddRequestDto {

    private int newsId;
    private String comment;
    private String scrapSummary;
    private List<HighlightDto> highlights;
}
