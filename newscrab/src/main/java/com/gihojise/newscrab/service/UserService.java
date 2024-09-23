package com.gihojise.newscrab.service;

import com.gihojise.newscrab.domain.User;
import com.gihojise.newscrab.dto.request.JoinDto;
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
    public void joinProcess(JoinDto joinDTO) {

        Boolean isExist = userRepository.existsByLoginId(joinDTO.getLoginId());

        if (isExist) {

            return;
        }

        User user = new User(joinDTO.getLoginId(), bCryptPasswordEncoder.encode(joinDTO.getPassword()), joinDTO.getName(), joinDTO.getEmail(), joinDTO.getBirthday(), joinDTO.getGender());

        userRepository.save(user);
    }
}