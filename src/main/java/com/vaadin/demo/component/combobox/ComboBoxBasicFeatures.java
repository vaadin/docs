package com.vaadin.demo.component.combobox;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("combo-box-basic-features")
public class ComboBoxBasicFeatures extends HorizontalLayout {

    public ComboBoxBasicFeatures() {
        setPadding(false);

        // tag::snippet[]
        ComboBox<String> field = new ComboBox<>();
        field.setLabel("Label");
        field.setHelperText("Helper text");
        field.setPlaceholder("Placeholder");
        field.setTooltipText("Tooltip text");
        field.setClearButtonVisible(true);
        field.setPrefixComponent(VaadinIcon.SEARCH.create());
        // end::snippet[]
        field.setItems("Value");

        add(field);
    }

    public static class Exporter extends DemoExporter<ComboBoxBasicFeatures> { // hidden-source-line
    } // hidden-source-line
}
