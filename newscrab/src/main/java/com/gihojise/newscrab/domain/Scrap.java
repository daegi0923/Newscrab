package com.gihojise.newscrab.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;

@Entity
@Table(name = "scrap")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Scrap extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "scrap_id", nullable = false)
    private Integer scrapId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "news_id", nullable = false)
    private News news;

    @Column(name = "scrap_summary", columnDefinition = "TEXT")
    private String scrapSummary;

    @Column(name = "comment", columnDefinition = "TEXT")
    private String comment;

    // 형광펜
    @OneToMany(mappedBy = "scrap", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Highlight> highlights;

    // 업데이트 메서드
    public void update(String scrapSummary, String comment) {
        if (scrapSummary != null) {
            this.scrapSummary = scrapSummary;
        }
        if (comment != null) {
            this.comment = comment;
        }
    }

}
