package com.gihojise.newscrab.service;

import com.gihojise.newscrab.domain.User;
import com.gihojise.newscrab.dto.request.SignupRequestDto;
import com.gihojise.newscrab.enums.Gender;
import com.gihojise.newscrab.enums.ProfileImage;
import com.gihojise.newscrab.exception.ErrorCode;
import com.gihojise.newscrab.exception.NewscrabException;
import com.gihojise.newscrab.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public void join(SignupRequestDto signupRequestDTO) {

        String loginId = signupRequestDTO.getLoginId();
        String password = signupRequestDTO.getPassword();
        String name = signupRequestDTO.getName();
        String email = signupRequestDTO.getEmail();
        LocalDate birthday = signupRequestDTO.getBirthday();
        Gender gender = signupRequestDTO.getGender();

        Boolean isExist = userRepository.existsByLoginId(loginId);

        if (isExist) {
            throw new NewscrabException(ErrorCode.DUPLICATE_LOGIN_ID);
        }

        if (loginId.length() < 5 || loginId.length() > 20) {
            throw new NewscrabException(ErrorCode.INVALID_LOGIN_ID);
        }

        if (password.length() < 8 || password.length() > 16) {
            throw new NewscrabException(ErrorCode.INVALID_PASSWORD);
        }

        if (name.length() < 2 || name.length() > 10) {
            throw new NewscrabException(ErrorCode.INVALID_NAME);
        }

        // 이메일 형식 정규표현식으로 체크
        if (!email.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$")) {
            throw new NewscrabException(ErrorCode.INVALID_EMAIL);
        }

        //빌더로 저장하기
        User user = User.builder()
                .loginId(loginId)
                .password(bCryptPasswordEncoder.encode(password))
                .name(name)
                .email(email)
                .birthday(birthday)
                .profileImg(ProfileImage.valueOf("A"))
                .gender(gender)
                .build();


        userRepository.save(user);
    }

    public Boolean checkLoginId(String loginId) {
        boolean result = userRepository.existsByLoginId(loginId);
        if (result) {
            // 이미 존재하는 아이디 예외발생
            throw new NewscrabException(ErrorCode.DUPLICATE_LOGIN_ID);
        }
        return result;
    }

    public Boolean checkEmail(String email) {
        boolean result = userRepository.existsByEmail(email);
        if (result) {
            // 이미 존재하는 이메일 예외발생
            throw new NewscrabException(ErrorCode.DUPLICATE_EMAIL);
        }
        return result;
    }
}