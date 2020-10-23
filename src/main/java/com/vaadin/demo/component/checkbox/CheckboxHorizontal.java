package com.vaadin.demo.component.checkbox;

import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("checkbox-horizontal")
public class CheckboxHorizontal extends Div {

    public CheckboxHorizontal() {
        // tag::snippet[]
        Checkbox checkbox = new Checkbox();
        checkbox.setLabel("Enabled");

        add(checkbox);
        // end::snippet[]
    }

    public static class GridEditorExporter extends DemoExporter<CheckboxHorizontal> { // hidden-full-source-line
    } // hidden-full-source-line
}
