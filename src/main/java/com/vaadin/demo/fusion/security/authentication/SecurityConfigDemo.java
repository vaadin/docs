package com.vaadin.demo.fusion.security.authentication;

import com.vaadin.flow.spring.security.VaadinSecurityConfigurer;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

/**
 * An example code for demoing the Spring Security configuration, shouldn't
 * affect the doc application itself.
 */
//@EnableWebSecurity
//@Configuration
public class SecurityConfigDemo {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // tag::public-resources[]
        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/images/**").permitAll());
        // end::public-resources[]
        // tag::login[]
        http.with(VaadinSecurityConfigurer.vaadin(), configurer -> configurer.loginView("/login"));
        // end::login[]
        return http.build();
    }

    @Bean
    public UserDetailsManager userDetailsService() {
        // Configure users and roles in memory
        return new InMemoryUserDetailsManager(
                // the {noop} prefix tells Spring that the password is not
                // encoded
                User.withUsername("user").password("{noop}password")
                        .roles("USER").build());
    }
}
