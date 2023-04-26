package com.vaadin.demo.component.emailfield;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("email-field-readonly-and-disabled")
public class EmailFieldReadonlyAndDisabled extends HorizontalLayout {

    public EmailFieldReadonlyAndDisabled() {
        setPadding(false);

        // tag::snippet[]
        EmailField readonlyField = new EmailField();
        readonlyField.setReadOnly(true);
        readonlyField.setLabel("Read-only");
        readonlyField.setValue("example@example.com");

        EmailField disabledField = new EmailField();
        disabledField.setEnabled(false);
        disabledField.setLabel("Disabled");
        // end::snippet[]
        add(readonlyField, disabledField);
    }

    public static class Exporter extends DemoExporter<EmailFieldReadonlyAndDisabled> { // hidden-source-line
    } // hidden-source-line
}
