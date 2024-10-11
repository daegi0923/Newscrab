package com.gihojise.newscrab.enums;

import lombok.Getter;

@Getter
public enum ProfileImage {
    A("A"),
    B("B"),
    C("C");

    private final String value;

    ProfileImage(String value) {
        this.value = value;
    }
}
