package com.vaadin.demo.component.checkbox;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("checkbox-trigger")
public class CheckboxTrigger extends Div {

    public CheckboxTrigger() {
        // tag::snippet[]
        Checkbox checkbox = new Checkbox();
        checkbox.setLabel("Enabled");

        add(checkbox);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<CheckboxTrigger> { // hidden-source-line
    } // hidden-source-line
}
