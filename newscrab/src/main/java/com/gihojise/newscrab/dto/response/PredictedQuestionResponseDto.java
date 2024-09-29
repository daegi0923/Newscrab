package com.gihojise.newscrab.dto.response;

import lombok.Getter;

@Getter
public class PredictedQuestionResponseDto {
    private final String question;

    public PredictedQuestionResponseDto(String question) {
        this.question = question;
    }

}
