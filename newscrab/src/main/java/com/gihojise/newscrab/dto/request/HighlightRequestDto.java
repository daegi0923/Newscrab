package com.gihojise.newscrab.dto.request;

import com.gihojise.newscrab.enums.HighlightColor;
import lombok.Getter;

@Getter
public class HighlightRequestDto {
    private Integer startPos;
    private Integer endPos;
    private HighlightColor color;
}
