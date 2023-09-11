package com.vaadin.demo.fusion.errorhandling;

import java.time.LocalDate;

import dev.hilla.BrowserCallable;
import com.vaadin.flow.server.auth.AnonymousAllowed;

@BrowserCallable
public class DateService {

    @AnonymousAllowed
    public LocalDate getTomorrow(LocalDate date) {
        return date.plusDays(1);
    }
}
