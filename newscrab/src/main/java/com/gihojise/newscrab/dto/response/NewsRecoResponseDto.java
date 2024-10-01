package com.gihojise.newscrab.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class NewsRecoResponseDto {
    private List<NewsResponseDto> userBase;
    private List<NewsResponseDto> itemBase;
    private List<NewsResponseDto> latest;

}
