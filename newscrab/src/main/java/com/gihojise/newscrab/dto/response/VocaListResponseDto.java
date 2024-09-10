package com.gihojise.newscrab.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class VocaListResponseDto {
    private int totalItems;
    private VocaResponseDto[] data;
}