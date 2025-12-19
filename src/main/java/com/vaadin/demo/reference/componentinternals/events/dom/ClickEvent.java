package com.vaadin.demo.reference.componentinternals.events.dom;

import com.vaadin.flow.component.ComponentEvent;
import com.vaadin.flow.component.DomEvent;
import com.vaadin.flow.component.EventData;
import com.vaadin.flow.component.html.NativeButton;

@DomEvent("click")
public class ClickEvent extends ComponentEvent<NativeButton> {

    private final int button;

    public ClickEvent(NativeButton source, boolean fromClient, 
            @EventData("event.button") int button) {
        super(source, fromClient);
        this.button = button;
    }
    
    public int getButton() {
        return button;
    }
}
