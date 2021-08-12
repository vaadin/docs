package com.vaadin.demo.fusion.accessingbackend;

import com.vaadin.fusion.Endpoint;
import com.vaadin.flow.server.auth.AnonymousAllowed;

/**
 * A Vaadin endpoint that counts numbers.
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
