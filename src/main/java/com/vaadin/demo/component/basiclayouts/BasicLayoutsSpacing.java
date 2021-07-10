package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.router.Route;

@Route("basic-layouts/spacing")
public class BasicLayoutsSpacing extends Div {

    private static final String ENABLED_OPTION = "Enabled";
    private static final String DISABLED_OPTION = "Disabled";

    public BasicLayoutsSpacing() {
        // tag::snippet[]
        VerticalLayout layout = new VerticalLayout();
        layout.setAlignItems(FlexComponent.Alignment.STRETCH);
        layout.add(new LayoutItem("Item 1"));
        layout.add(new LayoutItem("Item 2"));
        layout.add(new LayoutItem("Item 3"));

        RadioButtonGroup<String> radioButtonGroup = new RadioButtonGroup<>();
        radioButtonGroup.setLabel("Spacing");
        radioButtonGroup.setItems(ENABLED_OPTION, DISABLED_OPTION);
        radioButtonGroup.setValue(ENABLED_OPTION);
        radioButtonGroup.addValueChangeListener(
                e -> layout.setSpacing(ENABLED_OPTION.equals(e.getValue())));
        // end::snippet[]

        this.setClassName("basic-layouts-example");
        layout.setClassName("height-4xl");

        this.add(layout, radioButtonGroup);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<BasicLayoutsSpacing> { // hidden-source-line
    } // hidden-source-line
}
