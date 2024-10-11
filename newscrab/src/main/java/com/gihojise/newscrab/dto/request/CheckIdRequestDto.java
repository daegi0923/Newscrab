package com.gihojise.newscrab.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor //하나의 파라미터라면 @AllArgsConstructor 필수
public class CheckIdRequestDto {
    private String loginId;
}
