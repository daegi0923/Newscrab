package com.gihojise.newscrab.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "news_keyword")
@Getter
public class NewsKeyword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "keyword_id")
    private Integer keywordId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "news_id", nullable = false)
    private News news;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "industry_id", nullable = false)
    private Industry industry;

    @Column(name = "news_keyword_name", length = 255)
    private String newsKeywordName;
}
