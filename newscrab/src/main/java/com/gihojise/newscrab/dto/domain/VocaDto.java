package com.gihojise.newscrab.dto.domain;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class VocaDto {

    private int vocaId;
    private int newsId;
    private int userId;
    private String vocaName;
    private String vocaDesc;
    private int originNewsId;
    private String sentence;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer relatedNewsId1;
    private Integer relatedNewsId2;
    private Integer relatedNewsId3;
}
