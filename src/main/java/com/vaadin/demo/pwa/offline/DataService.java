package com.vaadin.demo.pwa.offline;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.exception.EndpointException;

@BrowserCallable
@AnonymousAllowed
public class DataService {

    public String getViewData() {
        throw new EndpointException("Not implemented");
    }
}
