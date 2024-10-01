package com.gihojise.newscrab.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor //이게 왜 있어야 할까
public class NewsSummaryResponseDto {
    private String summary;

    public NewsSummaryResponseDto(String summary) {
        this.summary = summary;
    }
}
