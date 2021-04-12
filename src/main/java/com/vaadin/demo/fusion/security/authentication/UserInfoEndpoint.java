package com.vaadin.demo.fusion.security.authentication;

import javax.annotation.security.PermitAll;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import com.vaadin.flow.server.connect.Endpoint;

/**
 * Provides information about the current user.
 */
// tag::snippet[]
@Endpoint
public class UserInfoEndpoint {

    @PermitAll
    public UserInfo getUserInfo() {
        Authentication auth = SecurityContextHolder.getContext()
                .getAuthentication();

        final List<String> authorities = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return new UserInfo(auth.getName(), authorities);
    }

}
// end::snippet[]
