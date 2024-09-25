package com.gihojise.newscrab.controller;

import com.gihojise.newscrab.dto.common.ApiResponse;
import com.gihojise.newscrab.dto.request.CheckEmailRequestDto;
import com.gihojise.newscrab.dto.request.CheckIdRequestDto;
import com.gihojise.newscrab.dto.request.LoginRequestDto;
import com.gihojise.newscrab.dto.request.SignupRequestDto;
import com.gihojise.newscrab.service.UserIndustryService;
import com.gihojise.newscrab.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}