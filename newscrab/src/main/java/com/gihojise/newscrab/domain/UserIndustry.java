package com.gihojise.newscrab.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "user_industry") // 테이블명 지정
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserIndustry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_industry_id")
    private Integer userIndustryId; // 선호산업번호 (Primary Key)

    @ManyToOne(fetch = FetchType.LAZY) // 다대일 관계, 여러 관심 산업은 한 명의 사용자와 연결됨
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false) // FK로 user_id를 참조
    private User user; // 사용자 (Foreign Key)

    @ManyToOne(fetch = FetchType.LAZY) // 다대일 관계, 여러 관심 산업은 한 산업에 연결됨
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "industry_id", nullable = false) // FK로 industry_id를 참조
    private Industry industry; // 산업 (Foreign Key)

    @Column(name = "pre_rank", nullable = false)
    private Integer preRank; // 선호순위

    // 필수 필드만 받는 생성자
    public UserIndustry(User user, Industry industry, Integer preRank) {
        this.user = user;
        this.industry = industry;
        this.preRank = preRank;
    }
}
