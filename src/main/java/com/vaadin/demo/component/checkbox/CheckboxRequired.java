package com.vaadin.demo.component.checkbox;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("checkbox-required")
public class CheckboxRequired extends HorizontalLayout {

    public CheckboxRequired() {
        // tag::snippet[]
        Checkbox checkbox = new Checkbox();
        checkbox.setLabel("I accept the terms and conditions");
        checkbox.setRequiredIndicatorVisible(true);
        checkbox.setErrorMessage("This field is required");
        // end::snippet[]

        Button button = new Button("Submit", e -> {
            checkbox.setInvalid(!checkbox.getValue());
        });

        setAlignItems(FlexComponent.Alignment.BASELINE);
        add(checkbox, button);
    }

    public static class Exporter extends DemoExporter<CheckboxRequired> { // hidden-source-line
    } // hidden-source-line
}
