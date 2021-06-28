package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter;  // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.router.Route;

import java.util.Arrays;
import java.util.List;

@Route("basic-layouts/horizontal-layout-individual-alignment")
public class BasicLayoutsHorizontalLayoutIndividualAlignment extends Div {

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

    public BasicLayoutsHorizontalLayoutIndividualAlignment() {
        // tag::layout[]
        LayoutItem item1 = new LayoutItem("Item 1");
        HorizontalLayout layout = new HorizontalLayout();
        layout.setPadding(true);
        layout.add(item1);
        layout.add(new LayoutItem("Item 2", true));
        layout.add(new LayoutItem("Item 3", true));
        // end::layout[]

        List<AlignmentOption> layoutOptions = Arrays
                .asList(new AlignmentOption("Stretch (default)",
                                FlexComponent.Alignment.STRETCH),
                        new AlignmentOption("Start",
                                FlexComponent.Alignment.START),
                        new AlignmentOption("Center",
                                FlexComponent.Alignment.CENTER),
                        new AlignmentOption("End", FlexComponent.Alignment.END),
                        new AlignmentOption("Baseline",
                                FlexComponent.Alignment.BASELINE));

        List<AlignmentOption> itemOptions = Arrays
                .asList(new AlignmentOption("Auto (default)",
                                FlexComponent.Alignment.AUTO),
                        new AlignmentOption("Stretch",
                                FlexComponent.Alignment.STRETCH),
                        new AlignmentOption("Start",
                                FlexComponent.Alignment.START),
                        new AlignmentOption("Center",
                                FlexComponent.Alignment.CENTER),
                        new AlignmentOption("End", FlexComponent.Alignment.END),
                        new AlignmentOption("Baseline",
                                FlexComponent.Alignment.BASELINE));

        RadioButtonGroup<AlignmentOption> layoutRadioGroup = new RadioButtonGroup<>();
        layoutRadioGroup.setLabel("Vertical alignment");
        layoutRadioGroup.setItems(layoutOptions);
        layoutRadioGroup.setValue(layoutOptions.get(0));
        // tag::eventhandler1[]
        layoutRadioGroup.addValueChangeListener(e -> {
            FlexComponent.Alignment alignment = e.getValue().getAlignment();
            layout.setAlignItems(alignment);
        });
        // end::eventhandler1[]

        RadioButtonGroup<AlignmentOption> itemRadioGroup = new RadioButtonGroup<>();
        itemRadioGroup.setLabel("Item 1: alignment");
        itemRadioGroup.setItems(itemOptions);
        itemRadioGroup.setValue(itemOptions.get(0));
        // tag::eventhandler2[]
        itemRadioGroup.addValueChangeListener(e -> {
            FlexComponent.Alignment alignment = e.getValue().getAlignment();
            layout.setAlignSelf(alignment, item1);
        });
        // end::eventhandler2[]

        this.setClassName("basic-layouts-example");
        layout.setClassName("height-5xl");

        this.add(layout, layoutRadioGroup, itemRadioGroup);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<BasicLayoutsHorizontalLayoutIndividualAlignment> { // hidden-source-line
    } // hidden-source-line
}
