package com.gihojise.newscrab.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class VocaSimpleResponseDto {
    private int vocaId;
    private int industryId;
    private String vocaName;
    private String vocaDesc;
    private int originNewsId;
    private String sentence;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private NewsSimpleDto relatedNews1;
    private NewsSimpleDto relatedNews2;
    private NewsSimpleDto relatedNews3;
}
