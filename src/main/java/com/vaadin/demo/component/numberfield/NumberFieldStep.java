package com.vaadin.demo.component.numberfield;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.NumberField;
import com.vaadin.flow.component.textfield.NumberField.NumberFieldI18n;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("number-field-step")
public class NumberFieldStep extends Div {

    public NumberFieldStep() {
        // tag::snippet[]
        NumberField numberField = new NumberField();
        numberField.setLabel("Duration (hours)");
        numberField.setStep(0.5);
        numberField.setValue(12.5);
        numberField.setStepButtonsVisible(true);
        numberField.setI18n(new NumberFieldI18n()
            .setBadInputErrorMessage("Invalid number format")
            .setStepErrorMessage("Duration must be a multiple of 0.5"));
        add(numberField);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<NumberFieldStep> { // hidden-source-line
    } // hidden-source-line
}
