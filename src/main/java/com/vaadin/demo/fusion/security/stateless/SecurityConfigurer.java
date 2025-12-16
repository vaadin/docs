package com.vaadin.demo.fusion.security.stateless;

import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jose.jws.JwsAlgorithms;
import org.springframework.security.web.SecurityFilterChain;

import com.vaadin.flow.spring.security.VaadinSecurityConfigurer;
import com.vaadin.flow.spring.security.stateless.VaadinStatelessSecurityConfigurer;

// tag::stateless-configure[]
@EnableWebSecurity
@Configuration
@Profile("this-is-just-a-demo-class") // hidden-source-line
public class SecurityConfigurer {

    @Value("${my.app.auth.secret}")
    private String authSecret;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {
        // end::stateless-configure[]
        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/admin-only/**").hasAnyRole("admin")
                .requestMatchers("/public/**").permitAll());

        // tag::stateless-configure[]
        // Disable creating and using sessions in Spring Security
        http.sessionManagement(sessionManagement -> sessionManagement
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // Register your login view to the view access checker mechanism
        http.with(VaadinSecurityConfigurer.vaadin(),
                configurer -> configurer.loginView("/login"));

        // Enable stateless authentication
        http.with(new VaadinStatelessSecurityConfigurer<>(),
                cfg -> cfg.withSecretKey()
                        .secretKey(new SecretKeySpec(
                                Base64.getDecoder().decode(authSecret), // <1>
                                JwsAlgorithms.HS256) // <2>
                        ).and().issuer("com.example.application") // <3>
        );

        return http.build();
    }
}
// end::stateless-configure[]
