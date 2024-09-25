package com.gihojise.newscrab.filter;

import com.gihojise.newscrab.exception.ErrorCode;
import com.gihojise.newscrab.exception.NewscrabException;
import com.gihojise.newscrab.service.RefreshService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

@RequiredArgsConstructor
public class LogoutFilter extends GenericFilterBean {

    private final RefreshService refreshService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
    }

    private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {

        //path and method verify
        String requestUri = request.getRequestURI();
        if (!requestUri.matches("^\\/api\\/v1\\/user\\/logout$")) {

            filterChain.doFilter(request, response);
            return;
        }
        String requestMethod = request.getMethod();
        if (!requestMethod.equals("POST")) {

            filterChain.doFilter(request, response);
            return;
        }

        //get refresh token
        String refresh = null;
        Cookie[] cookies = request.getCookies();

        //쿠키에 값이 없을 경우
        if (cookies == null) {
            throw new NewscrabException(ErrorCode.NOT_EXIST_COOKIE);
        }

        for (Cookie cookie : cookies) {

            if (cookie.getName().equals("refresh")) {

                refresh = cookie.getValue();
            }
        }

        //refresh null check
        if (refresh == null) {
            throw new NewscrabException(ErrorCode.NOT_EXIST_REFRESH_TOKEN);
        }

        //refresh token expired check
        if(refreshService.isRefreshTokenExpired(refresh)) {
            throw new NewscrabException(ErrorCode.EXPIRED_REFRESH_TOKEN);
        }

        // 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
        if (!refreshService.confirmRefreshToken(refresh)) {
            throw new NewscrabException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        //DB에 저장되어 있는지 확인
        if (!refreshService.existsByRefresh(refresh)) {
            throw new NewscrabException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        //로그아웃 진행
        //Refresh 토큰 DB에서 제거
        refreshService.deleteRefreshTokenByRefresh(refresh);

        //Refresh 토큰 Cookie 초기화
        Cookie cookie = new Cookie("refresh", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);

        response.addCookie(cookie);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}


