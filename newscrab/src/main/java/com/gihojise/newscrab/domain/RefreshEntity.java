package com.gihojise.newscrab.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@RedisHash(value = "refreshtoken", timeToLive = 86400)
@AllArgsConstructor
@Getter
@ToString
@Builder
public class RefreshEntity {
    @Id
    private String refresh;
}
