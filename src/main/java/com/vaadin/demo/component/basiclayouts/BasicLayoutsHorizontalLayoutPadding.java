package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.router.Route;

@Route("basic-layouts/padding")
public class BasicLayoutsHorizontalLayoutPadding extends Div {

    private static final String ENABLED_OPTION = "Enabled";
    private static final String DISABLED_OPTION = "Disabled";

    public BasicLayoutsHorizontalLayoutPadding() {
        // tag::snippet[]
        HorizontalLayout layout = new HorizontalLayout();
        layout.setAlignItems(FlexComponent.Alignment.STRETCH);
        layout.add(new Button("Button 1"));
        layout.add(new Button("Button 2"));
        layout.add(new Button("Button 3"));

        RadioButtonGroup<String> radioButtonGroup = new RadioButtonGroup<>();
        radioButtonGroup.setLabel("Padding");
        radioButtonGroup.setItems(ENABLED_OPTION, DISABLED_OPTION);
        radioButtonGroup.setValue(ENABLED_OPTION);
        radioButtonGroup.addValueChangeListener(
                e -> layout.setPadding(ENABLED_OPTION.equals(e.getValue())));
        // end::snippet[]

        this.setClassName("basic-layouts-example");
        layout.setClassName("height-4xl");

        this.add(layout, radioButtonGroup);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<BasicLayoutsPadding> { // hidden-source-line
    } // hidden-source-line
}