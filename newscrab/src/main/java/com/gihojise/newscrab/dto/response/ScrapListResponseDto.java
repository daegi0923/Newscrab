package com.gihojise.newscrab.dto.response;

import lombok.Builder;
import lombok.Getter;
import java.util.List;

@Getter
@Builder
public class ScrapListResponseDto {
    private List<ScrapResponseDto> data;
    private int totalItems;
}
