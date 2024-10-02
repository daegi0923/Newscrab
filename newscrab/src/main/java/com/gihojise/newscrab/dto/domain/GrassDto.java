package com.gihojise.newscrab.dto.domain;

import com.gihojise.newscrab.domain.Grass;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GrassDto {
    private int grassId;
    private LocalDateTime date;
    private int count;

    public GrassDto(Grass grass) {
        this.grassId = grass.getGrassId();
        this.date = grass.getCreatedAt();
        this.count = grass.getCount();
    }
}
