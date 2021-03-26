package com.vaadin.demo.fusion.security.authentication;

import java.util.Collection;

/**
 * User information used in client-side authentication and authorization.
 * To be saved in browsers’ LocalStorage for offline support.
 */
// tag::snippet[]
public class UserInfo {

    private String name;
    private Collection<String> authorities;

    public UserInfo(String name, Collection<String> authorities) {
        this.name = name;
        this.authorities = authorities;
    }

    public String getName() {
        return name;
    }

    public Collection<String> getAuthorities() {
        return authorities;
    }

}
// end::snippet[]
