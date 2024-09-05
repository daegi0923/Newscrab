package com.gihojise.newscrab.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "news")
@Getter
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "news_id")
    private Integer newsId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "industry_id", nullable = false)
    private Industry industry;

    @Column(name = "news_url", length = 255)
    private String newsUrl;

    @Column(name = "news_title", length = 255)
    private String newsTitle;

    @Column(name = "news_content", columnDefinition = "TEXT", nullable = false)
    private String newsContent;

    @Column(name = "news_company", length = 255)
    private String newsCompany;

    @Column(name = "news_published_at")
    private LocalDateTime newsPublishedAt;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "view")
    private Integer view;

    @OneToMany(mappedBy = "news", cascade = CascadeType.ALL)
    private Set<NewsPhoto> newsPhotos;

    @OneToMany(mappedBy = "news", cascade = CascadeType.ALL)
    private Set<NewsKeyword> newsKeywords;
}
