package com.gihojise.newscrab.dto.domain;

import com.gihojise.newscrab.domain.Industry;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class IndustryDto {

        private int industryId;
        private String industryName;
        private int preRank;
}
