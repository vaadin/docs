package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.router.Route;

@Route("basic-layouts/margin")
public class BasicLayoutsMargin extends Div {

    private static final String ENABLED_OPTION = "Enabled";
    private static final String DISABLED_OPTION = "Disabled";

    public BasicLayoutsMargin() {
        // tag::snippet[]
        VerticalLayout layout = new VerticalLayout();
        layout.setWidth("auto");
        layout.setMargin(true);
        layout.setAlignItems(FlexComponent.Alignment.STRETCH);
        layout.add(new LayoutItem("Item 1"));
        layout.add(new LayoutItem("Item 2"));
        layout.add(new LayoutItem("Item 3"));

        RadioButtonGroup<String> radioButtonGroup = new RadioButtonGroup<>();
        radioButtonGroup.setLabel("Margin");
        radioButtonGroup.setItems(ENABLED_OPTION, DISABLED_OPTION);
        radioButtonGroup.setValue(ENABLED_OPTION);
        radioButtonGroup.addValueChangeListener(
                e -> layout.setMargin(ENABLED_OPTION.equals(e.getValue())));
        // end::snippet[]

        Div container = new Div();
        container.add(layout);

        this.setClassName("basic-layouts-example");
        container.setClassName("container");

        this.add(container, radioButtonGroup);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<BasicLayoutsMargin> { // hidden-source-line
    } // hidden-source-line
}
