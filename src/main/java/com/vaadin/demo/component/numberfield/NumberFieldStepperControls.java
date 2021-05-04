package com.vaadin.demo.component.numberfield;

import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.formlayout.FormLayout.ResponsiveStep.LabelsPosition;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.IntegerField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("number-field-stepper-controls")
public class NumberFieldStepperControls extends FormLayout {

    public NumberFieldStepperControls() {
        setResponsiveSteps(new ResponsiveStep("0" , 1, LabelsPosition.ASIDE));

        // tag::snippet[]
        IntegerField adultsField = new IntegerField();
        adultsField.setValue(2);
        adultsField.setHasControls(true);
        adultsField.setMin(0);
        adultsField.setMax(9);
        // end::snippet[]
        addFormItem(adultsField, "Adults");

        IntegerField childrenField = new IntegerField();
        childrenField.setValue(2);
        childrenField.setHasControls(true);
        childrenField.setMin(0);
        childrenField.setMax(9);

        Div children = new Div();
        children.setText("Children");
        Div childrenExplainer = new Div();
        childrenExplainer.setText("Age 2-12");
        childrenExplainer.getStyle().set("font-size", "var(--lumo-font-size-xxs)");
        childrenExplainer.getStyle().set("position", "absolute");

        addFormItem(childrenField, new Div(children, childrenExplainer));

        IntegerField infantsField = new IntegerField();
        infantsField.setValue(1);
        infantsField.setHasControls(true);
        infantsField.setMin(0);
        infantsField.setMax(9);
        addFormItem(infantsField, "Infants");
    }

    public static class Exporter extends DemoExporter<NumberFieldStepperControls> { // hidden-source-line
    } // hidden-source-line
}
