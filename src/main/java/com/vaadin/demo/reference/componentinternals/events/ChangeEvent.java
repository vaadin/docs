package com.vaadin.demo.reference.componentinternals.events;

import com.vaadin.flow.component.ComponentEvent;

public class ChangeEvent extends ComponentEvent<TextField> {

    public ChangeEvent(TextField source, boolean fromClient) {
        super(source, fromClient);
    }    
}
