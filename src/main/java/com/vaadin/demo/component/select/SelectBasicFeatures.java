package com.vaadin.demo.component.select;

import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("select-basic-features")
public class SelectBasicFeatures extends HorizontalLayout {

    public SelectBasicFeatures() {
        setPadding(false);

        // tag::snippet[]
        Select<String> field = new Select<>();
        field.setLabel("Label");
        field.setHelperText("Helper text");
        field.setPlaceholder("Placeholder");
        field.setTooltipText("Tooltip text");
        field.setPrefixComponent(VaadinIcon.VAADIN_H.create());
        // end::snippet[]
        field.setItems("Most recent first", "Rating: high to low",
                "Rating: low to high", "Price: high to low",
                "Price: low to high");

        add(field);
    }

    public static class Exporter extends DemoExporter<SelectBasicFeatures> { // hidden-source-line
    } // hidden-source-line
}
