package com.gihojise.newscrab.dto.request;

import com.gihojise.newscrab.domain.News;
import lombok.Getter;

@Getter
public class ScrapQuestionRequestDto {

    private String text;
    private int newsId;
}
