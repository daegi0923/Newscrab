package com.gihojise.newscrab.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버 에러입니다."),
    DUPLICATE_EMAIL(HttpStatus.CONFLICT, "이미 존재하는 이메일 계정입니다."),
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "없는 회원의 정보 입니다."),

    NEWS_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 뉴스를 찾을 수 없습니다."),
    // 필요한 에러 코드들 계속 추가
    ;

    private final HttpStatus httpstatus;
    private final String message;
}
