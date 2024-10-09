package com.vaadin.demo.component.emailfield;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.EmailField.EmailFieldI18n;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("email-field-validation")
public class EmailFieldValidation extends HorizontalLayout {

    public EmailFieldValidation() {
        setPadding(false);

        // tag::snippet[]
        EmailField field = new EmailField("Email address");
        field.setRequiredIndicatorVisible(true);
        field.setPattern(
                "^[a-zA-Z0-9_\\-+]+(?:\\.[a-zA-Z0-9_\\-+]+)*@example\\.com$");

        field.setI18n(new EmailFieldI18n()
                .setRequiredErrorMessage("Field is required")
                .setPatternErrorMessage(
                        "Enter a valid example.com email address"));
        // end::snippet[]
        field.setHelperText("Only example.com addresses allowed");

        add(field);
    }

    public static class Exporter extends DemoExporter<EmailFieldValidation> { // hidden-source-line
    } // hidden-source-line
}
