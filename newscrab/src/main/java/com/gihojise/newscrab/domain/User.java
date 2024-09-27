package com.gihojise.newscrab.domain;

import com.gihojise.newscrab.dto.request.PasswordUpdateRequestDto;
import com.gihojise.newscrab.dto.request.UserUpdateRequestDto;
import com.gihojise.newscrab.enums.Gender;
import com.gihojise.newscrab.enums.ProfileImage;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user") // 테이블명 지정
@Builder
@AllArgsConstructor
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Integer userId; // 회원번호

    @Column(name = "login_id", nullable = false, unique = true)
    @Size(min = 5, max = 20, message = "아이디는 5~20자 사이여야 합니다.")
    private String loginId; // 아이디

    @Column(nullable = false)
    @Size(min = 8, max = 16, message = "비밀번호는 8~16자 사이여야 합니다.")
    private String password; // 비밀번호

    @Column(nullable = false)
    @Size(min = 2, max = 10, message = "닉네임은 2~10자 사이여야 합니다.")
    private String name; // 닉네임

    @Column(nullable = false, unique = true)
    @Email(message = "이메일 형식이 올바르지 않습니다.")
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

    // 유저 업데이트 메서드
    public void update(UserUpdateRequestDto userUpdateRequestDTO) {
        this.name = userUpdateRequestDTO.getName();
        this.email = userUpdateRequestDTO.getEmail();
        this.birthday = userUpdateRequestDTO.getBirthday();
        this.gender = userUpdateRequestDTO.getGender();
        this.profileImg = userUpdateRequestDTO.getProfileImage();
    }

    // 비밀번호 변경 메서드
    public void updatePassword(String password) {
        this.password = password;
    }
}