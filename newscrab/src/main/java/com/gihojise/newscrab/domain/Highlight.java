package com.gihojise.newscrab.domain;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(name = "highlight")
@Getter
public class Highlight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "highlight_no", nullable = false)
    private Integer highlightNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "scrap_id", nullable = false)
    private Scrap scrap;

    @Column(name = "start_pos", nullable = false)
    private Integer startPos;

    @Column(name = "end_pos", nullable = false)
    private Integer endPos;

    @Column(name = "color", nullable = false)
    @Enumerated(EnumType.STRING)
    private HighlightColor color;

}
