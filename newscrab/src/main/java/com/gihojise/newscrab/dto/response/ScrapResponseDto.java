package com.gihojise.newscrab.dto.response;

import com.gihojise.newscrab.dto.domain.HighlightDto;
import com.gihojise.newscrab.dto.domain.VocaDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class ScrapResponseDto {

    private int scrapId;
    private int newsId;
    private String newsTitle;
    private List<String> photolist;
    private String scrapSummary;
    private String comment;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<VocaDto> vocalist;
    private String newsContent;
    private List<HighlightDto> highlightList;
    private int industryId;
    private int view;
    private int scrapCnt;

}
