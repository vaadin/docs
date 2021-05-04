package com.vaadin.demo.component.textfield;

import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.formlayout.FormLayout.ResponsiveStep.LabelsPosition;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.textfield.TextFieldVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("text-field-text-alignment")
public class TextFieldTextAlignment extends FormLayout {

    public TextFieldTextAlignment() {
        setResponsiveSteps(new ResponsiveStep("0" , 1, LabelsPosition.ASIDE));

        TextField left = new TextField();
        left.setValue("value");
        addFormItem(left, "Left");

        TextField center = new TextField();
        center.setValue("value");
        center.addThemeVariants(TextFieldVariant.LUMO_ALIGN_CENTER);
        addFormItem(center, "Center");

        // tag::snippet[]
        TextField right = new TextField();
        right.setValue("value");
        right.addThemeVariants(TextFieldVariant.LUMO_ALIGN_RIGHT);
        // end::snippet[]
        addFormItem(right, "Right");
    }

    public static class Exporter extends DemoExporter<TextFieldTextAlignment> { // hidden-source-line
    } // hidden-source-line
}
