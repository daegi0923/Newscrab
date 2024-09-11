package com.gihojise.newscrab.dto.domain;

import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
@Builder
public class GrassDto {
    private int grassId;
    private Date date;
    private int count;
}
