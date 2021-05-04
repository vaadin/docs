package com.vaadin.demo.component.numberfield;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.IntegerField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("number-field-integer")
public class NumberFieldInteger extends HorizontalLayout {

    public NumberFieldInteger() {
        // tag::snippet[]
        IntegerField xField = new IntegerField();
        xField.setLabel("X");
        xField.setValue(-1284);

        IntegerField yField = new IntegerField();
        yField.setLabel("Y");
        yField.setValue(3910);

        add(xField, yField);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<NumberFieldInteger> { // hidden-source-line
    } // hidden-source-line
}
