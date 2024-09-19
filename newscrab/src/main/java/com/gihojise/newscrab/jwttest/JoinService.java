package com.gihojise.newscrab.jwttest;

import com.gihojise.newscrab.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class JoinService {

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