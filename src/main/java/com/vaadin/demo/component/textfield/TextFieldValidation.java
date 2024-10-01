package com.vaadin.demo.component.textfield;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.textfield.TextField.TextFieldI18n;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("text-field-validation")
public class TextFieldValidation extends HorizontalLayout {

    public TextFieldValidation() {
        setPadding(false);

        // tag::snippet[]
        TextField field = new TextField("Phone number");
        field.setRequiredIndicatorVisible(true);
        field.setPattern(
                "^[+]?[\\(]?[0-9]{3}[\\)]?[\\-]?[0-9]{3}[\\-]?[0-9]{4,6}$");
        field.setAllowedCharPattern("[0-9()+-]");
        field.setMinLength(5);
        field.setMaxLength(18);

        field.setI18n(new TextFieldI18n()
                .setRequiredErrorMessage("Field is required")
                .setMinLengthErrorMessage("Minimum length is 5 characters")
                .setMaxLengthErrorMessage("Maximum length is 18 characters")
                .setPatternErrorMessage("Invalid phone number format"));
        // end::snippet[]
        field.setHelperText("Format: +(123)456-7890");

        add(field);
    }

    public static class Exporter extends DemoExporter<TextFieldValidation> { // hidden-source-line
    } // hidden-source-line
}
