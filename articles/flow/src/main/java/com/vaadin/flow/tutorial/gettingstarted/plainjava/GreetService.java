package com.vaadin.flow.tutorial.gettingstarted.plainjava;

import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("getting-started/getting-started-overview.asciidoc")
public class GreetService {

    public String greet(String name) {
        if (name == null || name.isEmpty()) {
            return "Hello anonymous user";
        } else {
            return "Hello " + name;
        }
    }
}
