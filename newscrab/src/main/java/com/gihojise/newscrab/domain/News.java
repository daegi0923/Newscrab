package com.gihojise.newscrab.domain;

import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
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
    @ColumnDefault("0")
    private Integer view;

    @Column(name = "scrapCnt", nullable = false)
    @ColumnDefault("0")
    private Integer scrapCnt;

    @OneToMany(mappedBy = "news", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserNewsLike> likes; // 뉴스에 대한 찜 목록

    @OneToMany(mappedBy = "news", cascade = CascadeType.ALL)
    private List<NewsPhoto> newsPhotos;

    @OneToMany(mappedBy = "news", cascade = CascadeType.ALL)
    private List<NewsKeyword> newsKeywords;

    // Voca와의 양방향 관계 추가
    @OneToMany(mappedBy = "news", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Voca> vocas;

    // 관련 뉴스1
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "related_news_id_1")
    private News relatedNews1;

    // 관련 뉴스2
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "related_news_id_2")
    private News relatedNews2;

    // 관련 뉴스3
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "related_news_id_3")
    private News relatedNews3;

    // 조회수 증가 메서드
    public void increaseView() {
        this.view++;
    }

    // 스크랩 증가 메서드
    public void increaseScrapCnt() {
        this.scrapCnt++;
    }
}
