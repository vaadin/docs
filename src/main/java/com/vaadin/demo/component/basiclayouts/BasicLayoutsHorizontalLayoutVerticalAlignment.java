package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter;  // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.router.Route;

import java.util.Arrays;
import java.util.List;

@Route("basic-layouts/horizontal-layout-vertical-alignment")
public class BasicLayoutsHorizontalLayoutVerticalAlignment extends Div {

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

    public BasicLayoutsHorizontalLayoutVerticalAlignment() {
        // tag::layout[]
        HorizontalLayout layout = new HorizontalLayout();
        layout.setPadding(true);
        layout.add(new LayoutItem("Item 1"));
        layout.add(new LayoutItem("Item 2"));
        layout.add(new LayoutItem("Item 3"));
        // end::layout[]

        List<AlignmentOption> options = Arrays
                .asList(new AlignmentOption("Stretch (default)",
                                FlexComponent.Alignment.STRETCH),
                        new AlignmentOption("Start",
                                FlexComponent.Alignment.START),
                        new AlignmentOption("Center",
                                FlexComponent.Alignment.CENTER),
                        new AlignmentOption("End", FlexComponent.Alignment.END),
                        new AlignmentOption("Baseline",
                                FlexComponent.Alignment.BASELINE));

        RadioButtonGroup<AlignmentOption> radioGroup = new RadioButtonGroup<>();
        radioGroup.setLabel("Vertical alignment");
        radioGroup.setItems(options);
        radioGroup.setValue(options.get(0));
        // tag::eventhandler[]
        radioGroup.addValueChangeListener(e -> {
            FlexComponent.Alignment alignment = e.getValue().getAlignment();
            layout.setAlignItems(alignment);
        });
        // end::eventhandler[]

        this.setClassName("basic-layouts-example");
        layout.setClassName("height-5xl");

        this.add(layout, radioGroup);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<BasicLayoutsHorizontalLayoutVerticalAlignment> { // hidden-source-line
    } // hidden-source-line
}
