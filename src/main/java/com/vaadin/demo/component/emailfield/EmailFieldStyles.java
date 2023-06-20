package com.vaadin.demo.component.emailfield;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextFieldVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("email-field-styles")
public class EmailFieldStyles extends HorizontalLayout {

    public EmailFieldStyles() {
        setPadding(false);

        // tag::snippet[]
        EmailField field = new EmailField();
        field.addThemeVariants(
            TextFieldVariant.LUMO_SMALL,
            TextFieldVariant.LUMO_ALIGN_RIGHT,
            TextFieldVariant.LUMO_HELPER_ABOVE_FIELD
        );
        field.getStyle().set("--vaadin-input-field-border-width", "1px");
        // end::snippet[]
        field.setLabel("Label");
        field.setHelperText("Helper text");
        field.setValue("foo@bar.com");

        add(field);
    }

    public static class Exporter extends DemoExporter<EmailFieldStyles> { // hidden-source-line
    } // hidden-source-line
}
