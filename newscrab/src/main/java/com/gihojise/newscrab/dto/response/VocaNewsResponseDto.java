package com.gihojise.newscrab.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class VocaNewsResponseDto {

    @JsonProperty("related_news_id_1")
    private int relatedNewsId1;

    @JsonProperty("related_news_id_2")
    private int relatedNewsId2;

    @JsonProperty("related_news_id_3")
    private int relatedNewsId3;
}
