package com.gihojise.newscrab.dto.request;

import com.gihojise.newscrab.domain.News;
import lombok.Getter;

@Getter
public class PredictedQuestionRequestDto {

    private String industry;
    private String text;
    private int newsId;
}
