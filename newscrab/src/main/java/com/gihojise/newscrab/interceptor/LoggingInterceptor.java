package com.gihojise.newscrab.interceptor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Slf4j
@Component
public class LoggingInterceptor implements HandlerInterceptor {

    // 요청이 컨트롤러로 들어가기 전에 실행
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.info("Incoming request: {} {}", request.getMethod(), request.getRequestURI());
        return true; // 다음 인터셉터 또는 컨트롤러로 요청을 넘김
    }

    // 컨트롤러가 실행된 후, 뷰가 렌더링되기 전에 실행
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        log.info("Handler executed for: {} {}", request.getMethod(), request.getRequestURI());
    }

    // 요청 처리가 끝난 후 실행 (뷰 렌더링 후)
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        log.info("Request completed: {} {}, Status: {}", request.getMethod(), request.getRequestURI(), response.getStatus());
        if (ex != null) {
            log.error("Exception occurred: ", ex);
        }
    }
}
