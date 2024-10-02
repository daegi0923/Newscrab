package com.gihojise.newscrab.service;

import com.gihojise.newscrab.domain.Grass;
import com.gihojise.newscrab.domain.UserNewsLike;
import com.gihojise.newscrab.domain.UserNewsRead;
import com.gihojise.newscrab.dto.domain.GrassDto;
import com.gihojise.newscrab.dto.response.GrassPageResponseDto;
import com.gihojise.newscrab.dto.response.NewsPageResponseDto;
import com.gihojise.newscrab.dto.response.NewsResponseDto;
import com.gihojise.newscrab.repository.GrassRepository;
import com.gihojise.newscrab.repository.UserNewsLikeRepository;
import com.gihojise.newscrab.repository.UserNewsReadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProfileService {

    private final UserNewsReadRepository userNewsReadRepository;
    private final UserNewsLikeRepository userNewsLikeRepository;
    private final GrassRepository grassRepository;

    public NewsPageResponseDto getRecentNewsByPage(int userId, int page) {
        // 한 페이지에 보여줄 뉴스 개수 설정
        int pageSize = 15; // 원하는 페이지 크기를 설정

        // Pageable 객체 생성 (page는 0부터 시작)
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("readtime").descending());

        // 레포지토리에서 페이지 단위로 데이터 가져오기
        Page<UserNewsRead> newsPage = userNewsReadRepository.findDistinctNewsByUserId(userId, pageable);

        // 페이지 정보와 함께 DTO로 변환
        List<NewsResponseDto> newsDtoList = newsPage.getContent().stream()
                .map(newsRecord -> new NewsResponseDto(newsRecord.getNews()))
                .collect(Collectors.toList());


        // 페이지 응답 DTO 생성 및 반환
        return NewsPageResponseDto.builder()
                .news(newsDtoList)
                .currentPage(newsPage.getNumber())
                .totalPages(newsPage.getTotalPages())
                .totalItems((int) newsPage.getTotalElements())
                .build();
    }

    public NewsPageResponseDto getLikeNewsByPage(int userId, int page) {
        // 한 페이지에 보여줄 뉴스 개수 설정
        int pageSize = 15; // 원하는 페이지 크기를 설정

        // Pageable 객체 생성 (page는 0부터 시작)
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("createdAt").descending());

        // 레포지토리에서 페이지 단위로 데이터 가져오기
        Page<UserNewsLike> newsPage = userNewsLikeRepository.findByUser_UserId(userId, pageable);

        // 페이지 정보와 함께 DTO로 변환
        List<NewsResponseDto> newsDtoList = newsPage.getContent().stream()
                .map(newsRecord -> new NewsResponseDto(newsRecord.getNews()))
                .collect(Collectors.toList());

        // 페이지 응답 DTO 생성 및 반환
        return NewsPageResponseDto.builder()
                .news(newsDtoList)
                .currentPage(newsPage.getNumber())
                .totalPages(newsPage.getTotalPages())
                .totalItems((int) newsPage.getTotalElements())
                .build();
    }

    // 잔디 조회 하기
    public GrassPageResponseDto getGrassByDate(int userId, String ym) {

        YearMonth yearMonth = YearMonth.parse(ym);
        LocalDateTime startDateTime = yearMonth.atDay(1).atStartOfDay(); // 해당 월의 첫날 00:00:00
        LocalDateTime endDateTime = yearMonth.atEndOfMonth().atTime(23, 59, 59); // 해당 월의 마지막 날 23:59:59
        List<Grass> grassList = grassRepository.findAllByUser_UserIdAndCreatedAtBetween(userId, startDateTime, endDateTime);

        // Grass를 GrassDto로 변환
        GrassPageResponseDto response= new GrassPageResponseDto( grassList.stream().map(GrassDto::new).collect(Collectors.toList()));

        return response;
    }
}
