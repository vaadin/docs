package com.vaadin.demo.fusion.accessingbackend;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;

// tag::snippet[]
/**
 * An endpoint that counts numbers.
 */
@Endpoint
@AnonymousAllowed
public class CounterEndpoint {
    /**
     * A method that adds one to the argument.
     */
    public int addOne(int number) {
        return number + 1;
    }
}
// end::snippet[]
