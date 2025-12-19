package com.vaadin.demo.reference.componentinternals.properties.helper;

import java.util.Optional;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.PropertyDescriptor;
import com.vaadin.flow.component.PropertyDescriptors;
import com.vaadin.flow.component.Tag;

@Tag("input")
public class TextField extends Component {
// tag::property[]    
    private static final PropertyDescriptor<String, String> VALUE 
        = PropertyDescriptors.propertyWithDefault("value", "");

    public String getValue() {
        return get(VALUE);
    }

    public void setValue(String value) {
        set(VALUE, value);
    }
// end::property[]

// tag::attribute[]
    private static final PropertyDescriptor<String, Optional<String>> PLACEHOLDER 
        = PropertyDescriptors.optionalAttributeWithDefault("placeholder", "");

    public Optional<String> getPlaceholder() {
        return get(PLACEHOLDER);
    }

    public void setPlaceholder(String placeholder) {
        set(PLACEHOLDER, placeholder);
    }
// end::attribute[]
}
