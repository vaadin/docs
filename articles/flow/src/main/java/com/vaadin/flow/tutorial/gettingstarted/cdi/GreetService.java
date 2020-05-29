package com.vaadin.flow.tutorial.gettingstarted.cdi;

import com.vaadin.cdi.annotation.VaadinSessionScoped;
import com.vaadin.flow.tutorial.annotations.CodeFor;

/**
 * Data provider bean scoped for each user session.
 */
@CodeFor("getting-started/getting-started-overview.asciidoc")
@VaadinSessionScoped
public class GreetService {

    public String greet(String name) {
        if (name == null || name.isEmpty()) {
            return "Hello anonymous user";
        } else {
            return "Hello " + name;
        }
    }
}
