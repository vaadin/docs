package com.vaadin.demo.fusion.security.stateless;

import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jose.jws.JwsAlgorithms;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.vaadin.demo.ExcludeDemoSpringComponent; // hidden-source-line
import com.vaadin.flow.spring.security.VaadinWebSecurity;

// tag::stateless-configure[]
@EnableWebSecurity
@Configuration
@ExcludeDemoSpringComponent // hidden-source-line
public class SecurityConfig extends VaadinWebSecurity {

    @Value("${my.app.auth.secret}")
    private String authSecret;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // end::stateless-configure[]
        // Delegating the responsibility of general configurations
        // of http security to the super class. It's configuring
        // the followings: Vaadin's CSRF protection by ignoring
        // framework's internal requests, null request cache,
        // ignoring public views annotated with @AnonymousAllowed,
        // restricting access to other views/endpoints, and enabling
        // ViewAccessChecker authorization.
        // You can add any possible extra configurations of your own
        // here (the following is just an example):

        // http.rememberMe().alwaysRemember(false);

        // Configure your static resources with public access before calling
        // super.configure(HttpSecurity) as it adds final anyRequest matcher
        http.authorizeHttpRequests().requestMatchers(
                        new AntPathRequestMatcher("/admin-only/**"))
                .hasAnyRole("admin");
        http.authorizeHttpRequests().requestMatchers(
                        new AntPathRequestMatcher("/public/**"))
                .permitAll();

        // tag::stateless-configure[]
        super.configure(http);

        // Disable creating and using sessions in Spring Security
        http.sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // Register your login view to the view access checker mechanism
        setLoginView(http, "/login");

        // Enable stateless authentication
        setStatelessAuthentication(http,
                new SecretKeySpec(Base64.getDecoder().decode(authSecret), // <1>
                        JwsAlgorithms.HS256), // <2>
                "com.example.application" // <3>
        );
    }
}
// end::stateless-configure[]
