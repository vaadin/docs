package com.vaadin.demo.pwa.offline;

import dev.hilla.BrowserCallable;
import dev.hilla.exception.EndpointException;

@BrowserCallable
public class DataService {

    public String getViewData() {
        throw new EndpointException("Not implemented");
    }
}
