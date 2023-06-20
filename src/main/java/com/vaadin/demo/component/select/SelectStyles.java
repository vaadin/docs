package com.vaadin.demo.component.select;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.component.select.SelectVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("select-styles")
public class SelectStyles extends HorizontalLayout {

    public SelectStyles() {
        setPadding(false);

        // tag::snippet[]
        Select<String> field = new Select<>();
        field.addThemeVariants(
            SelectVariant.LUMO_SMALL,
            SelectVariant.LUMO_ALIGN_RIGHT,
            SelectVariant.LUMO_HELPER_ABOVE_FIELD
        );
        field.getStyle().set("--vaadin-input-field-border-width", "1px");
        // end::snippet[]
        field.setLabel("Label");
        field.setHelperText("Helper text");
        field.setItems("Value");
        field.setItems("Most recent first", "Rating: high to low",
                "Rating: low to high", "Price: high to low",
                "Price: low to high");
        field.setValue("Most recent first");

        add(field);
    }

    public static class Exporter extends DemoExporter<SelectStyles> { // hidden-source-line
    } // hidden-source-line
}
