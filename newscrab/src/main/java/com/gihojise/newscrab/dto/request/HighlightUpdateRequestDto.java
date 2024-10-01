package com.gihojise.newscrab.dto.request;

import com.gihojise.newscrab.enums.HighlightColor;
import lombok.Getter;

@Getter
public class HighlightUpdateRequestDto {
    private HighlightColor color;
}
