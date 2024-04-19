package com.vaadin.demo.fusion.security.authentication;

import com.vaadin.hilla.BrowserCallable;
import jakarta.annotation.Nonnull;
import jakarta.annotation.security.PermitAll;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Provides information about the current user.
 */
// tag::snippet[]
@BrowserCallable
public class UserInfoService {

    @PermitAll
    @Nonnull
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
