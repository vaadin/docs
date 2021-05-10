package com.vaadin.demo.fusion.errorhandling;

import java.time.LocalDate;

import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.server.auth.AnonymousAllowed;

@Endpoint
public class DateEndpoint {

    @AnonymousAllowed
    public LocalDate getTomorrow(LocalDate date) {
        return date.plusDays(1);
    }
}
