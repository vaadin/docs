package com.vaadin.demo;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.vaadin.flow.server.VaadinService;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/*
 * TODO: This class is a temporary workaround for https://github.com/vaadin/flow/issues/7525
 * Remove once the issue is fixed
 */
@Configuration
public class SpringConfig implements WebMvcConfigurer {

   @Override
   public void addInterceptors(InterceptorRegistry registry) {
      registry.addInterceptor(new HandlerInterceptor() {
         @Override
         public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
               throws Exception {
            request.getSession().removeAttribute(VaadinService.getCsrfTokenAttributeName());
            return true;
         }
      });
   }

}
