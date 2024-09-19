package com.gihojise.newscrab.jwttest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash(value = "refreshtoken", timeToLive = 60)
@AllArgsConstructor
@Getter
@ToString
@Builder
public class RefreshEntity {

    @Id
    private String refresh;

    private String loginId;
    private String expiration;
}