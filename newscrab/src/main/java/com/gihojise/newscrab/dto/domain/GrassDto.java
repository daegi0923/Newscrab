package com.gihojise.newscrab.dto.domain;

import com.gihojise.newscrab.domain.Grass;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GrassDto {
    private int grassId;
    private LocalDate date;
    private int count;

    public GrassDto(Grass grass) {
        this.grassId = grass.getGrassId();
        this.date = grass.getCreatedAt().toLocalDate();
        this.count = grass.getCount();
    }
}
