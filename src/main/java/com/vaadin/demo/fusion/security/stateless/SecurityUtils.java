package com.vaadin.demo.fusion.security.stateless;

import java.util.Optional;

import org.springframework.context.annotation.Profile;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

@Profile("this-is-just-a-demo-class") // hidden-source-line
// tag::user-details[]
@Component
public class SecurityUtils {

    private final UserDetailsService userDetailsService;

    SecurityUtils(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    public Optional<UserDetails> getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext()
                .getAuthentication();
        if (authentication != null
                && authentication.getPrincipal() instanceof Jwt jwt) {
            return Optional.of(
                    userDetailsService.loadUserByUsername(jwt.getSubject()));
        }
        // Anonymous or no authentication.
        return Optional.empty();
    }

}
// end::user-details[]
