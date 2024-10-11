package com.gihojise.newscrab.controller;

import com.gihojise.newscrab.domain.CustomUserDetails;
import com.gihojise.newscrab.domain.User;
import com.gihojise.newscrab.dto.common.ApiResponse;
import com.gihojise.newscrab.dto.request.*;
import com.gihojise.newscrab.dto.response.UserNameResponseDto;
import com.gihojise.newscrab.dto.response.UserResponseDto;
import com.gihojise.newscrab.service.UserIndustryService;
import com.gihojise.newscrab.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Tag(name = "User Controller", description = "유저 API")
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;
    private final UserIndustryService userIndustryService;

    @Operation(summary = "회원가입", description = "회원가입을 진행합니다.")
    @PostMapping("/join")
    public void join(@RequestBody SignupRequestDto signupRequestDTO) {

        userService.join(signupRequestDTO);
        userIndustryService.saveUserIndustries(signupRequestDTO.getLoginId(), signupRequestDTO.getUserIndustry());

    }

    @Operation(summary = "아이디 중복 확인", description = "아이디 중복을 확인합니다")
    @PostMapping("/nickname")
    public ResponseEntity<ApiResponse<Void>> checkNickname(@RequestBody CheckIdRequestDto checkIdRequestDTO) {
        userService.checkLoginId(checkIdRequestDTO.getLoginId());

        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "사용 가능한 아이디입니다.", null));
    }

    @Operation(summary = "이메일 중복 확인", description = "이메일 중복을 확인합니다")
    @PostMapping("/email")
    public ResponseEntity<ApiResponse<Void>> checkEmail(@RequestBody CheckEmailRequestDto checkEmailRequestDTO) {
        userService.checkEmail(checkEmailRequestDTO.getEmail());

        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "사용 가능한 이메일입니다.", null));
    }

    @Operation(summary = "회원정보 수정", description = "회원정보를 수정합니다.")
    @PutMapping("/update")
    public ResponseEntity<ApiResponse<Void>> update(@RequestBody UserUpdateRequestDto userUpdateRequestDTO, @AuthenticationPrincipal CustomUserDetails userDetails) {

        int userId = userDetails.getUserId();
        userService.update(userUpdateRequestDTO, userId);
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "회원정보 수정이 완료되었습니다.", null));
    }

    @Operation(summary = "비밀번호 변경", description = "비밀번호를 변경합니다.")
    @PutMapping("/password")
    public ResponseEntity<ApiResponse<Void>> updatePassword(@RequestBody PasswordUpdateRequestDto passwordUpdateRequestDTO, @AuthenticationPrincipal CustomUserDetails userDetails) {

        int userId = userDetails.getUserId();
        userService.updatePassword(passwordUpdateRequestDTO, userId);
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "비밀번호 변경이 완료되었습니다.", null));
    }

    // 유저 관심산업 변경
    @Operation(summary = "유저 관심산업 변경", description = "유저의 관심산업을 변경합니다.")
    @PutMapping("/userindustry")
    public ResponseEntity<ApiResponse<Void>> updateUserIndustry(@RequestBody UserIndustryUpdateDto userIndustryUpdateDto, @AuthenticationPrincipal CustomUserDetails userDetails) {

        int userId = userDetails.getUserId();
        userIndustryService.updateUserIndustries(userId, userIndustryUpdateDto.getUserIndustry());
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "유저 관심산업 변경이 완료되었습니다.", null));
    }

    // 로그인, 로그아웃은 필터에서 구현하고 스웨거 문서에만 표시하기위해 작성---
    @Operation(summary = "로그인", description = "로그인을 진행합니다.")
    @PostMapping("/login")
    public String loginProcess(@RequestBody LoginRequestDto loginRequestDTO) {
        return "ok";
    }

    @Operation(summary = "로그아웃", description = "로그아웃을 진행합니다.")
    @PostMapping("/logout")
    public String logoutProcess() {
        return "ok";
    }
    // 로그인, 로그아웃은 필터에서 구현하고 스웨거 문서에만 표시하기위해 작성---


    @Operation(summary = "회원 이름 조회", description = "회원 이름을 조회합니다.")
    @GetMapping("/name")
    public ResponseEntity<ApiResponse<UserNameResponseDto>> getUserName(@AuthenticationPrincipal CustomUserDetails userDetails) {
        int userId = userDetails.getUserId();
        UserNameResponseDto userNameResponseDto = userService.getUserName(userId);
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), "회원 이름 조회 성공", userNameResponseDto));
    }
}