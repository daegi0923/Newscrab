package com.gihojise.newscrab.dto.common;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(staticName = "of")
public class ApiResponse<T> {
    private final int statusCode;
    private final String message;
    private final T data;
}