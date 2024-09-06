package com.gihojise.newscrab.domain;

import jakarta.persistence.*;
import lombok.Getter;
import java.time.LocalDateTime;

@MappedSuperclass
@Getter
public abstract class BaseTimeEntity {

    @Column(name = "created_at", updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist // 엔티티가 저장되기 전에 호출됨
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate // 엔티티가 업데이트되기 전에 호출됨
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
