package com.vaadin.demo.reference.componentinternals.events.ui;

import com.vaadin.flow.component.ComponentEvent;
import com.vaadin.flow.component.textfield.TextField;

public class SearchEvent extends ComponentEvent<TextField> {

    private final String query;

    public SearchEvent(TextField source, String query) {
        super(source, false);
        this.query = query;
    }

    public String getQuery() {
        return query;
    }
}
