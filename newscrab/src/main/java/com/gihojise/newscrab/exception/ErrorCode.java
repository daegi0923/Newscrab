package com.gihojise.newscrab.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버 에러입니다."),

    // Auth
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "인증되지 않은 사용자입니다."),
    INVALID_ACCESS_TOKEN(HttpStatus.UNAUTHORIZED, "유효하지 않은 액세스 토큰입니다."),
    EXPIRED_ACCESS_TOKEN(HttpStatus.UNAUTHORIZED, "만료된 액세스 토큰입니다."),
    INVALID_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "유효하지 않은 리프레시 토큰입니다."),
    NOT_EXIST_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "존재하지 않는 리프레시 토큰입니다."),
    EXPIRED_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "만료된 리프레시 토큰입니다."),
    INVALID_JWT(HttpStatus.UNAUTHORIZED, "유효하지 않은 JWT입니다."),
    EMPTY_ID_OR_PASSWORD(HttpStatus.BAD_REQUEST, "아이디 혹은 비밀번호가 비어있습니다."),
    INVALID_LOGIN_REQUEST(HttpStatus.BAD_REQUEST, "로그인 요청을 파싱하지 못했습니다."),
    LOGIN_FAILED(HttpStatus.UNAUTHORIZED, "로그인에 실패했습니다."),
    NOT_EXIST_COOKIE(HttpStatus.UNAUTHORIZED, "쿠키에 값이 없습니다."),

    // signup
    INVALID_LOGIN_ID(HttpStatus.BAD_REQUEST, "아이디는 5자 이상 20자 이하여야 합니다."),
    INVALID_PASSWORD(HttpStatus.BAD_REQUEST, "비밀번호는 8자 이상 16자 이하여야 합니다."),
    INVALID_NAME(HttpStatus.BAD_REQUEST, "이름은 2자 이상 10자 이하여야 합니다."),
    INVALID_EMAIL(HttpStatus.BAD_REQUEST, "이메일 형식이 올바르지 않습니다."),

    // User
    DUPLICATE_EMAIL(HttpStatus.ALREADY_REPORTED, "이미 존재하는 이메일 계정입니다."),
    DUPLICATE_LOGIN_ID(HttpStatus.ALREADY_REPORTED, "이미 존재하는 로그인 아이디입니다."),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "없는 회원의 정보 입니다."),
    SAME_PASSWORD(HttpStatus.BAD_REQUEST, "기존 비밀번호와 새 비밀번호가 같습니다."),

    NEWS_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 뉴스를 찾을 수 없습니다."),

    ALREADY_LIKED(HttpStatus.CONFLICT, "이미 좋아요를 누른 뉴스입니다."),

    // VOCA
    VOCA_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 단어를 찾을 수 없습니다."),

    VOCA_NOT_MATCH_USER(HttpStatus.FORBIDDEN, "해당 단어는 사용자의 단어가 아닙니다."),


    // Scrap
    SCRAP_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 스크랩을 찾을 수 없습니다."),
    USER_NOT_MATCH(HttpStatus.FORBIDDEN, "해당 스크랩은 사용자의 스크랩이 아닙니다."),
    SCRAP_ALREADY_EXIST(HttpStatus.CONFLICT, "이미 스크랩한 뉴스입니다."),

    // LIKE
    LIKE_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 좋아요를 찾을 수 없습니다."),
    LIKE_ALREADY_EXISTS(HttpStatus.CONFLICT, "이미 좋아요를 누른 뉴스입니다."),

    // 필요한 에러 코드들 계속 추가
    ;

    private final HttpStatus httpstatus;
    private final String message;
}
