package com.gihojise.newscrab.dto.request;

import com.gihojise.newscrab.enums.Gender;
import com.gihojise.newscrab.enums.ProfileImage;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class UserUpdateRequestDto {

    private String name;        // 이름
    private String email;       // 이메일
    private LocalDate birthday;       // 생년월일
    private Gender gender;      // 성별
    private ProfileImage profileImg; // 프로필 이미지

}
