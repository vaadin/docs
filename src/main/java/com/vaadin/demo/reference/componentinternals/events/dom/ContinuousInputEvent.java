package com.vaadin.demo.reference.componentinternals.events.dom;

import com.vaadin.flow.component.ComponentEvent;
import com.vaadin.flow.component.DebounceSettings;
import com.vaadin.flow.component.DomEvent;
import com.vaadin.flow.component.EventData;
import com.vaadin.flow.dom.DebouncePhase;

@DomEvent(
    value = "input", 
    debounce = @DebounceSettings(
        timeout = 500, 
        phases = { 
            DebouncePhase.LEADING,
            DebouncePhase.INTERMEDIATE 
        }
    )
)
public class ContinuousInputEvent extends ComponentEvent<TextField> {

    private final String value;

    public ContinuousInputEvent(TextField source, boolean fromClient,
            @EventData("element.value") String value) {
        super(source, fromClient);
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
