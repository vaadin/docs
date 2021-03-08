package com.vaadin.demo.pwa.offline;

import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.server.connect.exception.EndpointException;

@Endpoint
public class DataEndpoint {

    public String getViewData() {
        throw new EndpointException("Not implemented");
    }
}
