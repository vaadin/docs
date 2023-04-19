package com.vaadin.demo.component.select;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("select-readonly-and-disabled")
public class SelectReadonlyAndDisabled extends HorizontalLayout {

    public SelectReadonlyAndDisabled() {
        setPadding(false);

        // tag::snippet[]
        Select<String> readonlyField = new Select<>();
        readonlyField.setReadOnly(true);
        // end::snippet[]
        readonlyField.setLabel("Read-only");
        readonlyField.setItems("Most recent first", "Rating: high to low",
                "Rating: low to high", "Price: high to low",
                "Price: low to high");
        readonlyField.setValue("Most recent first");
        
        // tag::snippet[]
        Select<String> disabledField = new Select<>();
        disabledField.setEnabled(false);
        // end::snippet[]
        disabledField.setLabel("Disabled");
        add(readonlyField, disabledField);
    }

    public static class Exporter extends DemoExporter<SelectReadonlyAndDisabled> { // hidden-source-line
    } // hidden-source-line
}
