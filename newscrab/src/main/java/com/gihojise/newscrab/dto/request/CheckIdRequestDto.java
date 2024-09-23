package com.gihojise.newscrab.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CheckIdRequestDto {
    private String loginId;
}
