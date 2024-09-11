package com.gihojise.newscrab.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class VocaListResponseDto {
    private int totalItems;
    private List<VocaResponseDto> data;
}
