package com.vaadin.demo.views.dashboard;

import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.server.connect.auth.AnonymousAllowed;
import com.vaadin.flow.server.connect.exception.VaadinConnectException;

/**
 * The endpoint for the client-side Form View.
 */
@Endpoint
@AnonymousAllowed
public class DashboardEndpoint {
    public String saveEmployee() throws VaadinConnectException {
        return "Great success";
    }
}
