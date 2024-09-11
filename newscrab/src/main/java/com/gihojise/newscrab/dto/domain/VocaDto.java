package com.gihojise.newscrab.dto.domain;

import lombok.Builder;
import lombok.Getter;

import java.util.Date;

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
    private Date createdAt;
    private Date updatedAt;
    private int relatedNewsId1;
    private int relatedNewsId2;
    private int relatedNewsId3;
}
