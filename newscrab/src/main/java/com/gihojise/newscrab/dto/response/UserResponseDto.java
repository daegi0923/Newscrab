package com.gihojise.newscrab.dto.response;

import com.gihojise.newscrab.enums.Gender;
import com.gihojise.newscrab.enums.ProfileImage;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
public class UserResponseDto {
    private String loginId;
    private String name;
    private String email;
    private LocalDate birthday;
    private Gender gender;
    private LocalDateTime createdAt;
    private ProfileImage profileImg;
    private int newsLikeCount;
    private int scrapCount;
    private int vocaCount;
}
