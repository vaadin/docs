package com.vaadin.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.csrf(AbstractHttpConfigurer::disable).build();

        /* Disable on docs app, but leave in place to be used as snippet // hidden-source-line
        // tag::download[]
        // Restrict access to FileDownloadEndpoint to authenticated users
        http.authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/download/**").authenticated());
        // end::download[]
        */ // hidden-source-line
    }
}
