package com.gihojise.newscrab.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "user") // 테이블명 지정
@Getter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId; // 회원번호

    @Column(nullable = false, unique = true)
    private String loginId; // 아이디

    @Column(nullable = false)
    private String password; // 비밀번호

    @Column(nullable = false)
    private String name; // 닉네임

    @Column(nullable = false, unique = true)
    private String email; // 이메일

    @Column(nullable = false)
    private LocalDate birthday; // 생년월일

    @Enumerated(EnumType.STRING) // Enum을 VARCHAR로 저장
    @Column(nullable = false)
    private Gender gender; // 성별 (ENUM)

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt; // 가입일자

    @Column(nullable = false)
    private LocalDateTime updatedAt; // 수정일자

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
