package com.vaadin.demo.component.numberfield;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.NumberField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("number-field-readonly-and-disabled")
public class NumberFieldReadonlyAndDisabled extends HorizontalLayout {

    public NumberFieldReadonlyAndDisabled() {
        setPadding(false);

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

    public static class Exporter extends DemoExporter<NumberFieldReadonlyAndDisabled> { // hidden-source-line
    } // hidden-source-line
}
