package com.vaadin.demo.pwa.offline;

import dev.hilla.Endpoint;
import dev.hilla.exception.EndpointException;

@Endpoint
public class DataEndpoint {

    public String getViewData() {
        throw new EndpointException("Not implemented");
    }
}
