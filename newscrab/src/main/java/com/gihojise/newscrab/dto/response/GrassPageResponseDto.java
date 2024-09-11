package com.gihojise.newscrab.dto.response;

import com.gihojise.newscrab.dto.domain.GrassDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class GrassPageResponseDto {
    private List<GrassDto> data;
}
