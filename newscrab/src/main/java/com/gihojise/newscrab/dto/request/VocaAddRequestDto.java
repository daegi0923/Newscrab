package com.gihojise.newscrab.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class VocaAddRequestDto {
    private Integer newsId;       // 뉴스 ID
    private String vocaName;      // 단어 이름
    private String vocaDesc;      // 단어 설명
    private String sentence;      // 문장
    private Integer industryId;   // 산업 ID

    // 생성자, 필요한 유효성 검증 메서드 등을 추가할 수 있습니다.
}
