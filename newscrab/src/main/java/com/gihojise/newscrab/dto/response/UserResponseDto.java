package com.gihojise.newscrab.dto.response;

import com.gihojise.newscrab.enums.Gender;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
public class UserResponseDto {
    private String userId;
    private String name;
    private String email;
    private LocalDate birthday;
    private Gender gender;
    private LocalDateTime createdAt;
    private int newsLikeCount;
    private int scrapCount;
    private int vocaCount;
}
