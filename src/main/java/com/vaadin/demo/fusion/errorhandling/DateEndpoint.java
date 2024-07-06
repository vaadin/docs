package com.vaadin.demo.fusion.errorhandling;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;

import java.time.LocalDate;

@Endpoint
public class DateEndpoint {

    @AnonymousAllowed
    public LocalDate getTomorrow(LocalDate date) {
        return date.plusDays(1);
    }
}
