package com.gihojise.newscrab.controller;

import com.gihojise.newscrab.domain.CustomUserDetails;
import com.gihojise.newscrab.dto.common.ApiResponse;
import com.gihojise.newscrab.dto.response.UserResponseDto;
import com.gihojise.newscrab.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Tag(name = "Profile Controller", description = "마이페이지 API")
@RequestMapping("/api/v1/profile")
public class ProfileController {

    private final UserService userService;


    //사용자 정보 조회
    @Operation(summary = "사용자 정보 조회", description = "사용자 정보를 조회합니다.")
    @GetMapping
    public ResponseEntity<ApiResponse<UserResponseDto>> getProfile(@AuthenticationPrincipal CustomUserDetails userDetails) {

        int userId = userDetails.getUserId();
        UserResponseDto response = userService.getProfile(userId);
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "사용자 정보 조회 성공", response));
    }

}
