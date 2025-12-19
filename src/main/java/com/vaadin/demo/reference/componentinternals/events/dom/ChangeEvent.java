package com.vaadin.demo.reference.componentinternals.events.dom;

import com.vaadin.flow.component.ComponentEvent;
import com.vaadin.flow.component.DomEvent;

@DomEvent("change")
public class ChangeEvent extends ComponentEvent<TextField> {

    public ChangeEvent(TextField source, boolean fromClient) {
        super(source, fromClient);
    }
}