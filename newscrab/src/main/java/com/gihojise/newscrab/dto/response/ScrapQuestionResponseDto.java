package com.gihojise.newscrab.dto.response;

import lombok.Getter;

@Getter
public class ScrapQuestionResponseDto {
    private final String question;

    public ScrapQuestionResponseDto(String question) {
        this.question = question;
    }

}
