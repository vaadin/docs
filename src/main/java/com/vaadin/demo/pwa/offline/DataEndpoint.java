package com.vaadin.demo.pwa.offline;

import com.vaadin.fusion.Endpoint;
import com.vaadin.fusion.exception.EndpointException;

@Endpoint
public class DataEndpoint {

    public String getViewData() {
        throw new EndpointException("Not implemented");
    }
}
