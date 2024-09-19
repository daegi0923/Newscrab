package com.gihojise.newscrab.jwttest;

import com.gihojise.newscrab.domain.User;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;
    private final UserRepository userRepository;
    private final RefreshRepository refreshRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //request에서 Authorization 헤더를 찾음
        String authorization= request.getHeader("Authorization");

        //Authorization 헤더 검증
        if (authorization == null || !authorization.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);

            //조건이 해당되면 메소드 종료 (필수)
            return;
        }

        //Bearer 부분 제거 후 순수 토큰만 획득
        String token = authorization.split(" ")[1];

        // jwtUtil.isExpired(token) --->> 이거 자체가 에러를 유발함
        // 토큰 만료 여부 확인
        if (jwtUtil.isExpired(token)) {
            //get refresh token
            String refresh = null;
            Cookie[] cookies = request.getCookies();
            for (Cookie cookie : cookies) {

                if (cookie.getName().equals("refresh")) {

                    refresh = cookie.getValue();
                }
            }

            if (refresh == null) {
                //response body
                PrintWriter writer = response.getWriter();
                writer.print("refreshtoken is null");

                //response status code
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }

            //expired check
            try {
                jwtUtil.isExpired(refresh);
            } catch (ExpiredJwtException e) {
                System.out.println("-----------1----------");
                //response body
                PrintWriter writer = response.getWriter();
                writer.print("refreshtoken is expired : 로그인 해주세요");

                //response status code
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }

            // 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
            String category = jwtUtil.getCategory(refresh);

            if (!category.equals("refresh")) {
                //response body
                PrintWriter writer = response.getWriter();
                writer.print("invalid refresh token");

                //response status code
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }

            //DB에 저장되어 있는지 확인
            RefreshEntity targetRefresh = refreshRepository.findByRefresh(refresh);
            if (targetRefresh == null) {
                //response body
                PrintWriter writer = response.getWriter();
                writer.print("refreshtoken is not in DB");

                //response status code
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }

            String loginId = jwtUtil.getUsername(refresh);

            //make new JWT
            String newAccess = jwtUtil.createJwt("access", loginId, 600000L);
            String newRefresh = jwtUtil.createJwt("refresh", loginId, 86400000L);

            //Refresh 토큰 저장 DB에 기존의 Refresh 토큰 삭제 후 새 Refresh 토큰 저장
            refreshRepository.deleteByRefresh(refresh);
            addRefreshEntity(loginId, newRefresh, 86400000L);

            //response
            response.setHeader("access", newAccess);
            response.addCookie(createCookie("refresh", newRefresh));
        }

        //토큰에서 username 획득
        String username = jwtUtil.getUsername(token);

        //userEntity를 생성하여 값 set
        User user=userRepository.findByLoginId(username);

        //UserDetails에 회원 정보 객체 담기
        CustomUserDetails customUserDetails = new CustomUserDetails(user);

        //스프링 시큐리티 인증 토큰 생성
        Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());

        //세션에 사용자 등록
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }

    private Cookie createCookie(String key, String value) {

        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24*60*60);
        cookie.setSecure(true);
        //cookie.setPath("/");
        cookie.setHttpOnly(true);

        return cookie;
    }

    private void addRefreshEntity(String username, String refresh, Long expiredMs) {

        Date date = new Date(System.currentTimeMillis() + expiredMs);

        RefreshEntity refreshEntity = RefreshEntity.builder()
                .loginId(username)
                .refresh(refresh)
                .expiration(date.toString())
                .build();

        refreshRepository.save(refreshEntity);
    }
}