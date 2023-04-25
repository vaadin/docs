package com.vaadin.demo.component.emailfield;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("email-field-constraints")
public class EmailFieldConstraints extends HorizontalLayout {

    public EmailFieldConstraints() {
        setPadding(false);

        // tag::snippet[]
        EmailField field = new EmailField("Email address");
        field.setRequiredIndicatorVisible(true);
        field.setPattern("^.+@example\\.com$");
        // end::snippet[]
        field.setHelperText("Only example.com addresses allowed");

        add(field);
    }

    public static class Exporter extends DemoExporter<EmailFieldConstraints> { // hidden-source-line
    } // hidden-source-line
}
