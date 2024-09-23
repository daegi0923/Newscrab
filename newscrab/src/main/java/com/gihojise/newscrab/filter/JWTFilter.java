package com.gihojise.newscrab.filter;

import com.gihojise.newscrab.domain.CustomUserDetails;
import com.gihojise.newscrab.domain.RefreshEntity;
import com.gihojise.newscrab.domain.User;
import com.gihojise.newscrab.repository.RefreshRepository;
import com.gihojise.newscrab.repository.UserRepository;
import com.gihojise.newscrab.service.RefreshService;
import com.gihojise.newscrab.util.JWTUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;

@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;
    private final UserRepository userRepository;
    private final RefreshService refreshService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // request에서 Authorization 헤더를 찾음
        String authorization = request.getHeader("Authorization");

        // Authorization 헤더 검증
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Bearer 부분 제거 후 순수 토큰만 획득
        String token = authorization.split(" ")[1];

        // 토큰 만료 여부 확인
        if (jwtUtil.isExpired(token)) {
            // Access Token이 만료되었을 경우 Refresh Token 확인
            String refresh = getRefreshTokenFromCookies(request);

            if (refresh == null) {
                sendErrorResponse(response, "refreshtoken is null", HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }

            //refresh token expired check
            if(refreshService.isRefreshTokenExpired(refresh)) {
                //response status code
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                return;
            }

            // Refresh Token이 유효한지 검증
            String category = jwtUtil.getCategory(refresh);
            if (!category.equals("refresh")) {
                sendErrorResponse(response, "invalid refresh token", HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }

            // Refresh Token이 DB에 존재하는지 확인
            if (!refreshService.existsByRefresh(refresh)) {
                sendErrorResponse(response, "refreshtoken is not in DB", HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }

            // DB에 있는 사용자의 loginId 추출
            String loginId = jwtUtil.getUsername(refresh);

            // 새로운 Access Token과 Refresh Token 발급
            token = jwtUtil.createJwt("access", loginId, 600000L);
            String newRefresh = jwtUtil.createJwt("refresh", loginId, 86400000L);

            // 기존 Refresh Token을 DB에서 삭제하고 새로운 Refresh Token 저장
            refreshService.deleteRefreshTokenByRefresh(refresh);
            refreshService.saveRefreshToken(newRefresh);

            // 갱신된 Access Token을 응답 헤더에 설정, Refresh Token은 쿠키에 저장
            response.setHeader("Authorization", "Bearer "+token);
            response.addCookie(createCookie("refresh", newRefresh));
        }

        // Access Token이 유효할 경우, 사용자 인증 정보 세팅
        String username = jwtUtil.getUsername(token);
        User user = userRepository.findByLoginId(username);

        CustomUserDetails customUserDetails = new CustomUserDetails(user);
        Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }


    private String getRefreshTokenFromCookies(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refresh".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    private void sendErrorResponse(HttpServletResponse response, String message, int statusCode) throws IOException {
        response.setStatus(statusCode);
        PrintWriter writer = response.getWriter();
        writer.print(message);
    }

    private Cookie createCookie(String key, String value) {

        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(86400);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setHttpOnly(true);

        return cookie;
    }
}