package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.router.Route;

import java.util.Arrays;
import java.util.List;

@Route("basic-layouts/vertical-layout-horizontal-alignment")
public class BasicLayoutsVerticalLayoutHorizontalAlignment extends Div {

    private static class AlignmentOption {
        private final String label;
        private final FlexComponent.Alignment alignment;

        public AlignmentOption(String label,
                FlexComponent.Alignment alignment) {
            this.label = label;
            this.alignment = alignment;
        }

        public FlexComponent.Alignment getAlignment() {
            return alignment;
        }

        @Override
        public String toString() {
            return label;
        }
    }

    public BasicLayoutsVerticalLayoutHorizontalAlignment() {
        // tag::layout[]
        VerticalLayout layout = new VerticalLayout();
        layout.add(new LayoutItem("Item 1"));
        layout.add(new LayoutItem("Item 2"));
        layout.add(new LayoutItem("Item 3"));
        // end::layout[]

        List<AlignmentOption> options = Arrays
                .asList(new AlignmentOption("Start (default)",
                                FlexComponent.Alignment.START),
                        new AlignmentOption("Center",
                                FlexComponent.Alignment.CENTER),
                        new AlignmentOption("End", FlexComponent.Alignment.END),
                        new AlignmentOption("Stretch",
                                FlexComponent.Alignment.STRETCH));

        RadioButtonGroup<AlignmentOption> radioGroup = new RadioButtonGroup<>();
        radioGroup.setLabel("Horizontal alignment");
        radioGroup.setItems(options);
        radioGroup.setValue(options.get(0));
        // tag::eventhandler[]
        radioGroup.addValueChangeListener(e -> {
            FlexComponent.Alignment alignment = e.getValue().getAlignment();
            layout.setAlignItems(alignment);
        });
        // end::eventhandler[]

        this.setClassName("basic-layouts-example");

        this.add(layout, radioGroup);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<BasicLayoutsVerticalLayoutHorizontalAlignment> { // hidden-source-line
    } // hidden-source-line
}
