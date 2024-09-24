package com.gihojise.newscrab.service;

import com.gihojise.newscrab.domain.User;
import com.gihojise.newscrab.dto.request.SignupRequestDto;
import com.gihojise.newscrab.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public void join(SignupRequestDto signupRequestDTO) {

        Boolean isExist = userRepository.existsByLoginId(signupRequestDTO.getLoginId());

        if (isExist) {

            return;
        }

        User user = new User(signupRequestDTO.getLoginId(), bCryptPasswordEncoder.encode(signupRequestDTO.getPassword()), signupRequestDTO.getName(), signupRequestDTO.getEmail(), signupRequestDTO.getBirthday(), signupRequestDTO.getGender());

        userRepository.save(user);
    }

    public Boolean checkLoginId(String loginId) {
        return userRepository.existsByLoginId(loginId);
    }

    public Boolean checkEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}