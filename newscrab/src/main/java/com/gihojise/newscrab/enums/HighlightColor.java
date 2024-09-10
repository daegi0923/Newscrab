package com.gihojise.newscrab.enums;

import lombok.Getter;

@Getter
public enum HighlightColor {
    Y("Yellow"),
    G("Green"),
    B("Blue");

    private final String value;

    HighlightColor(String value) {
        this.value = value;
    }
}
