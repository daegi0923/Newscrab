package com.gihojise.newscrab.dto.request;

import com.gihojise.newscrab.dto.domain.IndustryDto;
import lombok.Getter;

import java.util.List;

@Getter
public class UserIndustryUpdateDto {
    private List<IndustryDto> userIndustry;
}
