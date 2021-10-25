package com.vaadin.demo.fusion.security.stateless;

import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jose.jws.JwsAlgorithms;

import com.vaadin.demo.ExcludeDemoSpringComponent; // hidden-source-line
import com.vaadin.flow.spring.security.VaadinWebSecurityConfigurerAdapter;

// tag::stateless-configure[]
@EnableWebSecurity
@Configuration
@ExcludeDemoSpringComponent // hidden-source-line
public class SecurityConfig extends VaadinWebSecurityConfigurerAdapter {

    @Value("${my.app.auth.secret}")
    private String authSecret;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // end::stateless-configure[]
        http.authorizeRequests().antMatchers("/").permitAll();
        http.authorizeRequests().antMatchers("/public").permitAll();

        // tag::stateless-configure[]
        super.configure(http);

        http.sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        setLoginView(http, "/login");

        setStatelessAuthentication(http,
                new SecretKeySpec(Base64.getDecoder().decode(authSecret), // <1>
                        JwsAlgorithms.HS256), // <2>
                "com.example.application" // <3>
        );
    }
}
// end::stateless-configure[]
