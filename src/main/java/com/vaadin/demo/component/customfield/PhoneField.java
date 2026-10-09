package com.vaadin.demo.component.customfield;

import com.vaadin.flow.component.customfield.CustomField;
import com.vaadin.flow.component.textfield.TextField;

// tag::snippet[]
public class PhoneField extends CustomField<Phone> {
    private final TextField code = new TextField();
    private final TextField number = new TextField();

    public PhoneField() {
        code.setAriaLabel("Country code");
        number.setAriaLabel("Phone number");

        add(code, number);
    }

    @Override
    protected Phone generateModelValue() {
        return new Phone(code.getValue(), number.getValue());
    }

    @Override
    protected void setPresentationValue(Phone value) {
        if (value == null) {
            code.clear();
            number.clear();
        } else {
            code.setValue(value.getCode());
            number.setValue(value.getNumber());
        }
    }
}
// end::snippet[]
