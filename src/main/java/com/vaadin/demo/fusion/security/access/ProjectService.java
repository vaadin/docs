package com.vaadin.demo.fusion.security.access;

import java.util.List;

import jakarta.annotation.security.DenyAll;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

// tag::snippet[]
@BrowserCallable
@PermitAll
public class ProjectService {

    // Any logged-in user, from the annotation of the class
    public List<String> listProjects() {
        return List.of("Apollo", "Gemini");
    }

    // Everyone, also users who aren't logged in
    @AnonymousAllowed
    public int countProjects() {
        return 2;
    }

    // Users with the role ADMIN
    @RolesAllowed("ADMIN")
    public void deleteProject(String name) {
        // ...
    }

    // Nobody
    @DenyAll
    public void resetAll() {
        // ...
    }
}
// end::snippet[]
