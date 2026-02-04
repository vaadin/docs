// tag::basic[]
package com.vaadin.demo.reference.componentinternals.basics;

import com.vaadin.flow.component.Component;
// end::basic[]
import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.Synchronize;
// tag::basic[]
import com.vaadin.flow.component.Tag;
// end::basic[]
import com.vaadin.flow.shared.Registration;
// tag::basic[]

@Tag("input")
public class TextField extends Component {

    public TextField(String value) {
        getElement().setProperty("value", value);
    }

    // end::basic[]
    // tag::events[]
    @Synchronize("change")
    public String getValue() {
        return getElement().getProperty("value");
    }

    public void setValue(String value) {
        getElement().setProperty("value", value);
        fireEvent(new ChangeEvent(this, false));
    }

    public Registration addValueChangeListener(
            ComponentEventListener<ChangeEvent> listener) {
        return addListener(ChangeEvent.class, listener);
    }
    // end::events[]
    // tag::basic[]
}
// end::basic[]
