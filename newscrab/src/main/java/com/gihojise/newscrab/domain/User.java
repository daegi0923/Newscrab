package com.gihojise.newscrab.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "user") // 테이블명 지정
@Getter
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Integer userId; // 회원번호

    @Column(name = "login_id", nullable = false, unique = true)
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

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Grass> grasses;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<UserIndustry> userIndustries;

}
