package com.gihojise.newscrab.dto.request;

import com.gihojise.newscrab.enums.Gender;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class SignupRequestDto {

    private String loginId;
    private String password;
    private String name;
    private String email;
    private LocalDate birthday;
    private Gender gender;

}
