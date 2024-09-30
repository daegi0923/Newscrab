package com.gihojise.newscrab.domain;

import com.gihojise.newscrab.enums.HighlightColor;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "highlight")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Highlight{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "highlight_id", nullable = false)
    private Integer highlightId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "scrap_id", nullable = false)
    private Scrap scrap;

    @Column(name = "start_pos", nullable = false)
    private Integer startPos;

    @Column(name = "end_pos", nullable = false)
    private Integer endPos;

    @Column(name = "color", nullable = false)
    @Enumerated(EnumType.STRING)
    @ColumnDefault("'Y'")
    private HighlightColor color;

    //생성자
    public Highlight(Scrap scrap, Integer startPos, Integer endPos, HighlightColor color) {
        this.scrap = scrap;
        this.startPos = startPos;
        this.endPos = endPos;
        this.color = color;
    }
}
