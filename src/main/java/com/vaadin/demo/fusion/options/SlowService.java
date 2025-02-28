package com.vaadin.demo.fusion.options;

import org.jspecify.annotations.NonNull;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

@BrowserCallable
@AnonymousAllowed
public class SlowService {

    @NonNull
    public String takesTime() {
        try {
            Thread.sleep(10000); // Simulate a long process
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return "Process was interrupted";
        }
        return "Process completed";
    }

}
