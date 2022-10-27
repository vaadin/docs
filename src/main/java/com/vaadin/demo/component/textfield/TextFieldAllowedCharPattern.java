package com.vaadin.demo.component.textfield;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("text-field-allowed-char-pattern")
public class TextFieldAllowedCharPattern extends Div {

    public TextFieldAllowedCharPattern() {
        // tag::snippet[]
        TextField textField = new TextField();
        textField.setAllowedCharPattern("[\\d\\-+()]");
        textField.setHelperText("Format: +(123)456-7890");
        textField.setLabel("Phone number");
        add(textField);
        // end::snippet[]
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<TextFieldAllowedCharPattern> { // hidden-source-line
    } // hidden-source-line
}
