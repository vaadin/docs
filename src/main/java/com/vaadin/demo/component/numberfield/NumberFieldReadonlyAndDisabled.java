package com.vaadin.demo.component.numberfield;

import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.textfield.NumberField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("number-field-readonly-and-disabled")
public class NumberFieldReadonlyAndDisabled extends FormLayout {

    public NumberFieldReadonlyAndDisabled() {
        setAutoResponsive(true);
        setAutoRows(true);

        // tag::snippet[]
        NumberField readonlyField = new NumberField();
        readonlyField.setReadOnly(true);
        readonlyField.setLabel("Read-only");
        readonlyField.setValue(200.0);

        NumberField disabledField = new NumberField();
        disabledField.setEnabled(false);
        disabledField.setLabel("Disabled");
        // end::snippet[]
        add(readonlyField, disabledField);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<NumberFieldReadonlyAndDisabled> { // hidden-source-line
    } // hidden-source-line
}
