package com.vaadin.demo.hilla.testing;

import java.util.List;

import org.springframework.stereotype.Repository;

// tag::snippet[]
@Repository
public class UserRepository {
    public List<User> findAll() {
        return List.of(new User(0, "John", "Doe"), new User(1, "Jane", "Doe"));
    }
}
// end::snippet[]
