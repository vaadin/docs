package com.vaadin.demo.component.textfield;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("text-field-readonly-and-disabled")
public class TextFieldReadonlyAndDisabled extends HorizontalLayout {

    public TextFieldReadonlyAndDisabled() {
        setPadding(false);

        // tag::snippet[]
        TextField readonlyField = new TextField();
        readonlyField.setReadOnly(true);
        readonlyField.setLabel("Read-only");
        readonlyField.setValue("Value");

        TextField disabledField = new TextField();
        disabledField.setEnabled(false);
        disabledField.setLabel("Disabled");
        // end::snippet[]
        add(readonlyField, disabledField);
    }

    public static class Exporter extends DemoExporter<TextFieldReadonlyAndDisabled> { // hidden-source-line
    } // hidden-source-line
}
