package com.vaadin.demo.component.numberfield;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.IntegerField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

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
        integerField.setHasControls(true);
        add(integerField);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<NumberFieldMinMax> { // hidden-full-source-line
    } // hidden-full-source-line
}
