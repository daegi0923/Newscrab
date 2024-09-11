package com.gihojise.newscrab.domain;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(name = "news_photo")
@Getter
public class NewsPhoto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "photo_id", nullable = false)
    private Integer photoId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "news_id", nullable = false)
    private News news;

    @Column(name = "photo_url", length = 255, nullable = false)
    private String photoUrl;
}
