package com.vaadin.demo.component.numberfield;

import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.IntegerField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("number-field-step-buttons")
public class NumberFieldStepButtons extends FormLayout {

    public NumberFieldStepButtons() {
        setAutoResponsive(true);
        setLabelsAside(true);

        // tag::snippet[]
        IntegerField adultsField = new IntegerField();
        adultsField.setValue(2);
        adultsField.setStepButtonsVisible(true);
        adultsField.setMin(0);
        adultsField.setMax(9);
        // end::snippet[]
        addFormItem(adultsField, "Adults");

        IntegerField childrenField = new IntegerField();
        childrenField.setValue(2);
        childrenField.setStepButtonsVisible(true);
        childrenField.setMin(0);
        childrenField.setMax(9);

        Div children = new Div("Children");
        Div childrenExplainer = new Div();
        childrenExplainer.setText("Age 2-12");
        childrenExplainer.getStyle().set("font-size", "0.75em");
        childrenExplainer.getStyle().set("position", "absolute");

        addFormItem(childrenField, new Div(children, childrenExplainer));

        IntegerField infantsField = new IntegerField();
        infantsField.setValue(1);
        infantsField.setStepButtonsVisible(true);
        infantsField.setMin(0);
        infantsField.setMax(9);
        addFormItem(infantsField, "Infants");
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<NumberFieldStepButtons> { // hidden-source-line
    } // hidden-source-line
}
