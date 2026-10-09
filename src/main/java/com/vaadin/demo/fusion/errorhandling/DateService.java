package com.vaadin.demo.fusion.errorhandling;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

import java.time.LocalDate;

@BrowserCallable
public class DateService {

    @AnonymousAllowed
    public LocalDate getTomorrow(LocalDate date) {
        return date.plusDays(1);
    }
}
