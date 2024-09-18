package com.vaadin.demo.component.passwordfield;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.PasswordField.PasswordFieldI18n;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("password-field-validation")
public class PasswordFieldValidation extends HorizontalLayout {

    public PasswordFieldValidation() {
        setPadding(false);

        // tag::snippet[]
        PasswordField field = new PasswordField("Password");
        field.setRequiredIndicatorVisible(true);
        field.setPattern("^[A-Za-z0-9]+$");
        field.setMinLength(6);
        field.setMaxLength(12);

        field.setI18n(new PasswordFieldI18n()
                .setRequiredErrorMessage("Field is required")
                .setMinLengthErrorMessage("Minimum length is 6 characters")
                .setMaxLengthErrorMessage("Maximum length is 12 characters")
                .setPatternErrorMessage("Only letters A-Z and numbers are allowed"));
        // end::snippet[]
        field.setHelperText(
                "6 to 12 characters. Only letters A-Z and numbers supported.");

        add(field);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<PasswordFieldValidation> { // hidden-source-line
    } // hidden-source-line
}
