package com.vaadin.demo.reference.componentinternals.events;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.shared.Registration;

@Tag("input")
public class TextField extends Component {

    // tag::listener[]
    public Registration addChangeListener(
            ComponentEventListener<ChangeEvent> listener) {
        return addListener(ChangeEvent.class, listener);
    }
    // end::listener[]

    // tag::fire[]
    public void setValue(String value) {
        getElement().setAttribute("value", value);
        fireEvent(new ChangeEvent(this, false));
    }
    // end::fire[]
}
