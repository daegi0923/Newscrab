package com.gihojise.newscrab.domain;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(name = "scrap")
@Getter
public class Scrap extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "scrap_id", nullable = false)
    private Integer scrapId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "news_id", nullable = false)
    private News news;

    @Column(name = "scrap_summary", columnDefinition = "TEXT")
    private String scrapSummary;

    @Column(name = "comment", columnDefinition = "TEXT")
    private String comment;

}
