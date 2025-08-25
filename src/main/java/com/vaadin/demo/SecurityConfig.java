package com.vaadin.demo;

import com.vaadin.flow.spring.security.VaadinWebSecurity;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.servlet.util.matcher.PathPatternRequestMatcher;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends VaadinWebSecurity {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable());

        /* Disable on docs app, but leave in place to be used as snippet // hidden-source-line
        // tag::download[]
        // Restrict access to FileDownloadEndpoint to authenticated users
        http.authorizeHttpRequests(authorize -> authorize
                .requestMatchers(PathPatternRequestMatcher.withDefaults().matcher("/download/**")).authenticated());
        // end::download[]
        */ // hidden-source-line
    }

}
