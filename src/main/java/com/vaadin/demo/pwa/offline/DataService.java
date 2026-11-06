package com.vaadin.demo.pwa.offline;

import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.exception.EndpointException;

@BrowserCallable
public class DataService {

    public String getViewData() {
        throw new EndpointException("Not implemented");
    }
}
