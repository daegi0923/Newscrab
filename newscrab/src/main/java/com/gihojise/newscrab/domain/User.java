package com.gihojise.newscrab.domain;

import com.gihojise.newscrab.enums.Gender;
import com.gihojise.newscrab.enums.ProfileImage;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "user") // 테이블명 지정
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    @Column(name = "profile_img", nullable = false)
    @Enumerated(EnumType.STRING)
    @ColumnDefault("'A'")
    private ProfileImage profileImg;  // 기본값 설정

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Grass> grasses = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<UserIndustry> userIndustries = new HashSet<>();

    // 필수 필드만 받는 생성자
    public User(String loginId, String password, String name, String email, LocalDate birthday, Gender gender) {
        this.loginId = loginId;
        this.password = password;
        this.name = name;
        this.email = email;
        this.birthday = birthday;
        this.gender = gender;
        this.profileImg = ProfileImage.A;
    }
}
