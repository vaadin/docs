package com.vaadin.demo.component.numberfield;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.BigDecimalField;
import com.vaadin.flow.router.Route;

import java.math.BigDecimal;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("number-field-big-decimal")
public class NumberFieldBigDecimal extends Div {

    public NumberFieldBigDecimal() {
        // tag::snippet[]
        BigDecimalField bigDecimalField = new BigDecimalField();
        bigDecimalField.setLabel("Result");
        bigDecimalField.setWidth("240px");
        bigDecimalField.setValue(new BigDecimal("948205817.472950487"));
        add(bigDecimalField);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<NumberFieldBigDecimal> { // hidden-source-line
    } // hidden-source-line
}
