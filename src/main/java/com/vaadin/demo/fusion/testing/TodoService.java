package com.vaadin.demo.fusion.testing;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

// tag::snippet[]
@BrowserCallable
@AnonymousAllowed
public class TodoService {

    public void addTodo(String text) {
        // Store the todo, for example in a database
    }
}
// end::snippet[]
