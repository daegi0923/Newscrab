package com.gihojise.newscrab.domain;

import com.gihojise.newscrab.enums.HighlightColor;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "highlight")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
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

    public Highlight(Scrap finalScrap, Integer startPos, Integer endPos, HighlightColor color) {
        this.scrap = finalScrap;
        this.startPos = startPos;
        this.endPos = endPos;
        this.color = color;
    }

    // 색 변경
    public void changeColor(HighlightColor color) {
        this.color = color;
    }
}
