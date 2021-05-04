package com.vaadin.demo.component.checkbox;

import com.vaadin.flow.component.checkbox.CheckboxGroup;
import com.vaadin.flow.component.checkbox.CheckboxGroupVariant;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("checkbox-adjacent-groups")
public class CheckboxAdjacentGroups extends VerticalLayout {

    public CheckboxAdjacentGroups() {
        setPadding(false);
        setSpacing(false);

        // tag::snippet[]
        CheckboxGroup<String> manufacturer = new CheckboxGroup<>();
        manufacturer.setLabel("Manufacturer");
        manufacturer.setItems("Akuchi", "Broek", "Wulf");
        manufacturer.addThemeVariants(CheckboxGroupVariant.LUMO_VERTICAL);

        CheckboxGroup<String> status = new CheckboxGroup<>();
        status.setLabel("Status");
        status.setItems("In progress", "Done", "Cancelled");
        status.addThemeVariants(CheckboxGroupVariant.LUMO_VERTICAL);

        add(manufacturer, status);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<CheckboxAdjacentGroups> { // hidden-source-line
    } // hidden-source-line
}
