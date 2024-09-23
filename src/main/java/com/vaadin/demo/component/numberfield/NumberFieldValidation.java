package com.vaadin.demo.component.numberfield;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.IntegerField;
import com.vaadin.flow.component.textfield.IntegerField.IntegerFieldI18n;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("number-field-validation")
public class NumberFieldValidation extends Div {

    public NumberFieldValidation() {
        // tag::snippet[]
        IntegerField integerField = new IntegerField();
        integerField.setLabel("Quantity");
        integerField.setHelperText("Max 10 items");
        integerField.setRequiredIndicatorVisible(true);
        integerField.setMin(1);
        integerField.setMax(10);
        integerField.setValue(2);
        integerField.setStepButtonsVisible(true);

        integerField.setI18n(new IntegerFieldI18n()
            .setRequiredErrorMessage("Field is required")
            .setBadInputErrorMessage("Invalid number format")
            .setMinErrorMessage("Quantity must be at least 1")
            .setMaxErrorMessage("Maximum 10 items available"));

        add(integerField);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<NumberFieldValidation> { // hidden-source-line
    } // hidden-source-line
}
