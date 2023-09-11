package com.vaadin.demo.fusion.accessingbackend;

import dev.hilla.BrowserCallable;
import com.vaadin.flow.server.auth.AnonymousAllowed;

// tag::snippet[]
/**
 * A service that counts numbers.
 */
@BrowserCallable
@AnonymousAllowed
public class CounterService {
    /**
     * A method that adds one to the argument.
     */
    public int addOne(int number) {
        return number + 1;
    }
}
// end::snippet[]
