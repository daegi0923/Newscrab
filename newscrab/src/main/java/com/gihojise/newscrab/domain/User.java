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
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user") // 테이블명 지정
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

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserNewsLike> likedNews; // 찜한 뉴스 목록

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

    // 뉴스 찜 추가 메서드
    public void addLike(News news) {
        // 이미 likedNews에 존재하는지 확인
        boolean alreadyLiked = likedNews.stream().anyMatch(like -> like.getNews().equals(news));
        if (alreadyLiked) {
            return; // 중복이 발견되면 추가하지 않음
        }

        // UserNewsLike 객체 생성 및 양방향 연관관계 설정
        UserNewsLike like = new UserNewsLike(this, news);

        // likedNews에 추가
        likedNews.add(like);

        // News 객체의 likes 리스트에 추가 (중복 체크 포함)
        if (!news.getLikes().contains(like)) {
            news.getLikes().add(like);
        }
    }

    // 뉴스 찜 삭제 메서드
    public void removeLike(News news) {
        likedNews.removeIf(like -> like.getNews().equals(news));
        news.getLikes().removeIf(like -> like.getUser().equals(this));
    }

}
