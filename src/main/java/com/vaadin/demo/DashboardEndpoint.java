package com.vaadin.demo;

import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.server.auth.AnonymousAllowed;

/**
 * The endpoint for the client-side Form View.
 */
@Endpoint
@AnonymousAllowed
public class DashboardEndpoint {

    public String saveEmployee() {
        return "Great success";
    }
}
