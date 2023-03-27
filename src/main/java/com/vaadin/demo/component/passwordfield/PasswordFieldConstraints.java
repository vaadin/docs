package com.vaadin.demo.component.passwordfield;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("password-field-constraints")
public class PasswordFieldConstraints extends HorizontalLayout {

    public PasswordFieldConstraints() {
        setPadding(false);

        // tag::snippet[]
        PasswordField field = new PasswordField("Password");
        field.setRequired(true);
        field.setAllowedCharPattern("[A-Za-z0-9]");
        field.setMinLength(6);
        field.setMaxLength(12);
        // end::snippet[]
        field.setHelperText("6 to 12 characters. Only letters A-Z and numbers supported.");

        add(field);
    }

    public static class Exporter extends DemoExporter<PasswordFieldConstraints> { // hidden-source-line
    } // hidden-source-line
}
