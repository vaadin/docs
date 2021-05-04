package com.vaadin.demo.component.numberfield;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.NumberField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("number-field-basic")
public class NumberFieldBasic extends HorizontalLayout {

    public NumberFieldBasic() {
        setPadding(false);

        // tag::snippet[]
        NumberField dollarField = new NumberField();
        dollarField.setLabel("Balance");
        dollarField.setValue(200.0);
        Div dollarPrefix = new Div();
        dollarPrefix.setText("$");
        dollarField.setPrefixComponent(dollarPrefix);

        NumberField euroField = new NumberField();
        euroField.setLabel("Balance");
        euroField.setValue(200.0);
        Div euroSuffix = new Div();
        euroSuffix.setText("€");
        euroField.setSuffixComponent(euroSuffix);

        add(dollarField, euroField);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<NumberFieldBasic> { // hidden-source-line
    } // hidden-source-line
}
