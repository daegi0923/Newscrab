package com.gihojise.newscrab.service;

import com.gihojise.newscrab.domain.Industry;
import com.gihojise.newscrab.domain.User;
import com.gihojise.newscrab.domain.UserIndustry;
import com.gihojise.newscrab.dto.domain.IndustryDto;
import com.gihojise.newscrab.repository.IndustryRepository;
import com.gihojise.newscrab.repository.UserIndustryRepository;
import com.gihojise.newscrab.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class UserIndustryService {

    private final UserIndustryRepository userIndustryRepository;
    private final UserRepository userRepository;
    private final IndustryRepository industryRepository;

    @Transactional
    public void saveUserIndustries(String loginId, List<IndustryDto> industries) {

        for (IndustryDto industry : industries) {
            User user= userRepository.findByLoginId(loginId);
            Industry industryEntity = industryRepository.findByIndustryId(industry.getIndustryId());
            UserIndustry userIndustry = new UserIndustry(user, industryEntity, industry.getPreRank());
            userIndustryRepository.save(userIndustry);
        }
    }
}
