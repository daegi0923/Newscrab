package com.gihojise.newscrab.enums;

import lombok.Getter;

@Getter
public enum HighlightColor {
    Y("Yellow"),
    G("Green"),
    B("Blue"),
    R("Red");

    private final String value;

    HighlightColor(String value) {
        this.value = value;
    }
}
