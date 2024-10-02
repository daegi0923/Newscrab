package com.gihojise.newscrab.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class VocaListAddRequestDto {
    List<VocaAddRequestDto> vocaAddList;

}
