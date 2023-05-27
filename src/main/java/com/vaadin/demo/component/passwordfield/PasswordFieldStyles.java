package com.vaadin.demo.component.passwordfield;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.TextFieldVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("password-field-styles")
public class PasswordFieldStyles extends HorizontalLayout {

    public PasswordFieldStyles() {
        setPadding(false);

        // tag::snippet[]
        PasswordField field = new PasswordField();
        field.addThemeVariants(
            TextFieldVariant.LUMO_SMALL,
            TextFieldVariant.LUMO_ALIGN_RIGHT,
            TextFieldVariant.LUMO_HELPER_ABOVE_FIELD
        );
        field.getStyle().set("--vaadin-input-field-border-width", "1px");
        // end::snippet[]
        field.setLabel("Label");
        field.setHelperText("Helper text");
        field.setValue("Ex@mplePassw0rd");

        add(field);
    }

    public static class Exporter extends DemoExporter<PasswordFieldStyles> { // hidden-source-line
    } // hidden-source-line
}
