package com.gihojise.newscrab.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class VocaResponseDto {
    private int vocaId;
    private String vocaName;
    private String vocaDesc;
    private int originNewsId;
    private String sentence;
    private String createdAt;
    private String updatedAt;
    private int relatedNewsId1;
    private int relatedNewsId2;
    private int relatedNewsId3;
}
