package com.vaadin.demo.component.passwordfield;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("password-field-readonly-and-disabled")
public class PasswordFieldReadonlyAndDisabled extends HorizontalLayout {

    public PasswordFieldReadonlyAndDisabled() {
        setPadding(false);

        // tag::snippet[]
        PasswordField readonlyField = new PasswordField();
        readonlyField.setReadOnly(true);
        readonlyField.setLabel("Read-only");
        readonlyField.setValue("Ex@mplePassw0rd");

        PasswordField disabledField = new PasswordField();
        disabledField.setEnabled(false);
        disabledField.setLabel("Disabled");
        // end::snippet[]
        add(readonlyField, disabledField);
    }

    public static class Exporter extends DemoExporter<PasswordFieldReadonlyAndDisabled> { // hidden-source-line
    } // hidden-source-line
}
