package com.gihojise.newscrab.dto.domain;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class GrassDto {
    private int grassId;
    private LocalDate date;
    private int count;
}
