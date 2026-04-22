package com.vaadin.demo.component.emailfield;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextFieldVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("email-field-styles")
public class EmailFieldStyles extends Div {

    public EmailFieldStyles() {
        // tag::snippet[]
        EmailField field = new EmailField();
        field.addThemeVariants(TextFieldVariant.SMALL,
                TextFieldVariant.ALIGN_RIGHT, TextFieldVariant.HELPER_ABOVE);
        // end::snippet[]
        field.setLabel("Label");
        field.setHelperText("Helper text");
        field.setValue("foo@bar.com");

        add(field);
    }

    public static class Exporter extends DemoExporter<EmailFieldStyles> { // hidden-source-line
    } // hidden-source-line
}
