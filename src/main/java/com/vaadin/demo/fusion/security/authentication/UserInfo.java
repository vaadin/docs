package com.vaadin.demo.fusion.security.authentication;

import java.util.List;

// tag::snippet[]
public record UserInfo(String name, List<String> roles) {
}
// end::snippet[]
