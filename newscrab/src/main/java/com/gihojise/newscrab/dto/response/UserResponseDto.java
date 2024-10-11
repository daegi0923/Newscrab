package com.gihojise.newscrab.dto.response;

import com.gihojise.newscrab.domain.Industry;
import com.gihojise.newscrab.domain.UserIndustry;
import com.gihojise.newscrab.dto.domain.IndustryDto;
import com.gihojise.newscrab.enums.Gender;
import com.gihojise.newscrab.enums.ProfileImage;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

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
    //유저 산업 리스트 추가
    private List<IndustryDto> userIndustry;
    private int newsLikeCount;
    private int scrapCount;
    private int vocaCount;
}
