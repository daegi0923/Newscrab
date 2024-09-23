package com.gihojise.newscrab.controller;

import com.gihojise.newscrab.dto.request.JoinDto;
import com.gihojise.newscrab.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/join")
    public String joinProcess(@RequestBody JoinDto joinDTO) {

        userService.joinProcess(joinDTO);

        return "ok";
    }
}