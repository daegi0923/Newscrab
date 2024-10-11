package com.gihojise.newscrab.exception;

import lombok.Getter;

@Getter
public class NewscrabException extends RuntimeException {

    private final ErrorCode errorCode;

    public NewscrabException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

}
