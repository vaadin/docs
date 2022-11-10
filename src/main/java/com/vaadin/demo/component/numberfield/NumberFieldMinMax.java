package com.vaadin.demo.component.numberfield;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.IntegerField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("number-field-min-max")
public class NumberFieldMinMax extends Div {

    public NumberFieldMinMax() {
        // tag::snippet[]
        IntegerField integerField = new IntegerField();
        integerField.setLabel("Quantity");
        integerField.setHelperText("Max 10 items");
        integerField.setMin(0);
        integerField.setMax(10);
        integerField.setValue(2);
        integerField.setStepButtonsVisible(true);
        add(integerField);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<NumberFieldMinMax> { // hidden-source-line
    } // hidden-source-line
}
