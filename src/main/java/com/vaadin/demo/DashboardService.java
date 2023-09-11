package com.vaadin.demo;

import dev.hilla.BrowserCallable;
import com.vaadin.flow.server.auth.AnonymousAllowed;

/**
 * The endpoint for the client-side Form View.
 */
@BrowserCallable
@AnonymousAllowed
public class DashboardService {

    public String saveEmployee() {
        return "Great success";
    }
}
