package com.gihojise.newscrab.domain;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "news")
@Getter
public class News extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "news_id", nullable = false)
    private Integer newsId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "industry_id", nullable = false)
    private Industry industry;

    @Column(name = "news_url", length = 255, nullable = false)
    private String newsUrl;

    @Column(name = "news_title", length = 255, nullable = false)
    private String newsTitle;

    @Column(name = "news_content", columnDefinition = "TEXT", nullable = false)
    private String newsContent;

    @Column(name = "news_company", length = 255, nullable = false)
    private String newsCompany;

    @Column(name = "news_published_at", nullable = false)
    private LocalDateTime newsPublishedAt;

    @Column(name = "view", nullable = false)
    private Integer view = 0;

    @OneToMany(mappedBy = "news", cascade = CascadeType.ALL)
    private Set<NewsPhoto> newsPhotos;

    @OneToMany(mappedBy = "news", cascade = CascadeType.ALL)
    private Set<NewsKeyword> newsKeywords;

    // Voca와의 양방향 관계 추가
    @OneToMany(mappedBy = "news", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Voca> vocas;

}
