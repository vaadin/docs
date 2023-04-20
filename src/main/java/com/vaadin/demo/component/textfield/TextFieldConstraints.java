package com.vaadin.demo.component.textfield;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("text-field-constraints")
public class TextFieldConstraints extends HorizontalLayout {

    public TextFieldConstraints() {
        setPadding(false);

        // tag::snippet[]
        TextField field = new TextField("Phone number");
        field.setRequiredIndicatorVisible(true);
        field.setPattern("^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$");
        field.setAllowedCharPattern("[0-9()+-]");
        field.setMinLength(5);
        field.setMaxLength(18);
        // end::snippet[]
        field.setHelperText("Format: +(123)456-7890");

        add(field);
    }

    public static class Exporter extends DemoExporter<TextFieldConstraints> { // hidden-source-line
    } // hidden-source-line
}
