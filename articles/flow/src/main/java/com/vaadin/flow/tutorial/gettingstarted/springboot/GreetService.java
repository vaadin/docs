package com.vaadin.flow.tutorial.gettingstarted.springboot;

import java.io.Serializable;

import org.springframework.stereotype.Service;

import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("getting-started/getting-started-overview.asciidoc")
@Service
public class GreetService implements Serializable {

    public String greet(String name) {
        if (name == null || name.isEmpty()) {
            return "Hello anonymous user";
        } else {
            return "Hello " + name;
        }
    }

}
