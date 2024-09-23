package com.gihojise.newscrab.dto.request;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class LoginRequestDto {
        private String loginId;
        private String password;
}
