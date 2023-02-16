package com.vaadin.demo;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import com.vaadin.flow.spring.security.VaadinWebSecurity;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends VaadinWebSecurity {

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.csrf().disable();
  }

}
