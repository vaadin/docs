package com.vaadin.demo.hilla.testing;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

// tag::snippet[]
@Endpoint
@AnonymousAllowed
public class UsersEndpoint {
    private final UserRepository users;

    public UsersEndpoint(@Autowired UserRepository users) {
        this.users = users;
    }


    @Nonnull
    public List<@Nonnull User> findAll() {
        return users.findAll();
    }
}
// end::snippet[]
