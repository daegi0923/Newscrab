package com.gihojise.newscrab.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "grass") // 테이블명 지정
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Grass extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long grassId; // 잔디 ID (Primary Key)

    @ManyToOne(fetch = FetchType.LAZY) // 다대일 관계, 여러 잔디는 하나의 사용자와 연결
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false) // FK로 user_id를 참조
    private User user; // 사용자 ID (Foreign Key)

    @Column(nullable = false)
    private int count; // 개수

    // 카운트를 증가시키는 비즈니스 로직
    public void increaseCount() {
        this.count += 1; // 카운트 1 증가
    }

}
