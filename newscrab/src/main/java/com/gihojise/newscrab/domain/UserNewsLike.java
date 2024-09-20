package com.gihojise.newscrab.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "user_news_like")
public class UserNewsLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_news_like_id", nullable = false)
    private Integer userNewsLikeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "news_id", nullable = false)
    private News news;

    @CreatedDate
    private LocalDateTime createdAt;

    public UserNewsLike(User user, News news) {
        this.user = user;
        this.news = news;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserNewsLike that = (UserNewsLike) o;
        return Objects.equals(user.getUserId(), that.user.getUserId()) &&
                Objects.equals(news.getNewsId(), that.news.getNewsId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(user.getUserId(), news.getNewsId());
    }

}
