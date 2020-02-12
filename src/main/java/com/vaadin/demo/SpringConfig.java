package com.vaadin.demo;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.vaadin.flow.server.VaadinService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/*
 * TODO: This class is a temporary workaround for https://github.com/vaadin/flow/issues/7525
 * Remove once the issue is fixed
 */
@Configuration
public class SpringConfig implements WebMvcConfigurer {

   @Autowired
   private Environment environment;

   @Override
   public void addInterceptors(InterceptorRegistry registry) {
      registry.addInterceptor(new HandlerInterceptor() {
         @Override
         public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
               throws Exception {
            if (environment.getActiveProfiles().length > 0 && environment.getActiveProfiles()[0] == "dev") {
               request.getSession().removeAttribute(VaadinService.getCsrfTokenAttributeName());
            }
            return true;
         }
      });
   }

}
