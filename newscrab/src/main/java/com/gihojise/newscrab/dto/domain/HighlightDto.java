package com.gihojise.newscrab.dto.domain;

import com.gihojise.newscrab.enums.HighlightColor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class HighlightDto {

    private int highlightId;
    private int startPos;
    private int endPos;
    private HighlightColor color;
}
