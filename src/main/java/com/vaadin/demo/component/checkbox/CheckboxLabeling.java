package com.vaadin.demo.component.checkbox;

import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("checkbox-labeling")
public class CheckboxLabeling extends Div {

    public CheckboxLabeling() {
        // tag::snippet[]
        Checkbox checkbox = new Checkbox();
        checkbox.setLabel("Yes, I agree");

        add(checkbox);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<CheckboxLabeling> { // hidden-source-line
    } // hidden-source-line
}
