package com.vaadin.demo.pwa.offline;

import com.vaadin.hilla.Endpoint;
import com.vaadin.hilla.exception.EndpointException;

@Endpoint
public class DataEndpoint {

    public String getViewData() {
        throw new EndpointException("Not implemented");
    }
}
