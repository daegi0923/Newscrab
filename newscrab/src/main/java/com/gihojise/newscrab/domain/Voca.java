package com.gihojise.newscrab.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "voca")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Voca extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voca_id", nullable = false)
    private Integer vocaId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "news_id", nullable = false)
    private News news;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "industry_id")
    private Integer industryId;

    @Column(name = "voca_name", length = 255)
    private String vocaName;

    @Column(name = "voca_desc", columnDefinition = "TEXT")
    private String vocaDesc;

    @Column(name = "sentence", columnDefinition = "TEXT")
    private String sentence;

    // 연관 뉴스 1
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "related_news_id_1")
    private News relatedNews1;

    // 연관 뉴스 2
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "related_news_id_2")
    private News relatedNews2;

    // 연관 뉴스 3
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "related_news_id_3")
    private News relatedNews3;
}
