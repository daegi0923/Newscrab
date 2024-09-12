package com.gihojise.newscrab.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class VocaResponseDto {
    private int vocaId;
    private int industryId;
    private String vocaName;
    private String vocaDesc;
    private int originNewsId;
    private String sentence;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int relatedNewsId1;
    private int relatedNewsId2;
    private int relatedNewsId3;
}
