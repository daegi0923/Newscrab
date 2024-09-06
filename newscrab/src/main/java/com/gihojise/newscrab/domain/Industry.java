package com.gihojise.newscrab.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "industry")
@Getter
public class Industry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "industry_id", nullable = false)
    private Integer industryId;

    @Column(name = "industry_name", nullable = false)
    private String industryName;

    @OneToMany(mappedBy = "industry", cascade = CascadeType.ALL)
    private Set<Keyword> keywords;

    @OneToMany(mappedBy = "industry", cascade = CascadeType.ALL)
    private Set<UserIndustry> userIndustries;
}
