package com.vaadin.demo.reference.componentinternals.properties.element;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;

@Tag("input")
public class TextField extends Component {

// tag::property[]
    public TextField() {
        getElement().addPropertyChangeListener("value", "change", e -> {
        });
    }

    public String getValue() {
        return getElement().getProperty("value");
    }

    public void setValue(String value) {
        getElement().setProperty("value", value);
    }
// end::property[]
}
