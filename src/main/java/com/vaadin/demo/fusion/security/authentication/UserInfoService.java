package com.vaadin.demo.fusion.security.authentication;

import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.flow.spring.security.AuthenticationContext;
import com.vaadin.hilla.BrowserCallable;

// tag::snippet[]
@BrowserCallable
public class UserInfoService {

    private final AuthenticationContext authenticationContext;

    UserInfoService(AuthenticationContext authenticationContext) {
        this.authenticationContext = authenticationContext;
    }

    @AnonymousAllowed
    public @Nullable UserInfo getUserInfo() {
        return authenticationContext.getPrincipalName()
                .map(name -> new UserInfo(name,
                        authenticationContext.getGrantedAuthorities().stream()
                                .map(GrantedAuthority::getAuthority).toList()))
                .orElse(null); // Nobody is logged in
    }
}
// end::snippet[]
