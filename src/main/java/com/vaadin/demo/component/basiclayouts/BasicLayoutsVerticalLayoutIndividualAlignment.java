package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.router.Route;

import java.util.Arrays;
import java.util.List;

@Route("basic-layouts/vertical-layout-individual-alignment")
public class BasicLayoutsVerticalLayoutIndividualAlignment extends Div {

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

    public BasicLayoutsVerticalLayoutIndividualAlignment() {
        // tag::snippet[]
        LayoutItem item1 = new LayoutItem("Item 1");
        VerticalLayout layout = new VerticalLayout();
        layout.setPadding(true);
        layout.setSpacing(true);
        layout.add(item1);
        layout.add(new LayoutItem("Item 2", true));
        layout.add(new LayoutItem("Item 3", true));

        List<AlignmentOption> layoutOptions = Arrays
                .asList(new AlignmentOption("Start (default)",
                                FlexComponent.Alignment.START),
                        new AlignmentOption("Center",
                                FlexComponent.Alignment.CENTER),
                        new AlignmentOption("End", FlexComponent.Alignment.END),
                        new AlignmentOption("Stretch",
                                FlexComponent.Alignment.STRETCH));

        List<AlignmentOption> itemOptions = Arrays
                .asList(new AlignmentOption("Auto (default)",
                                FlexComponent.Alignment.AUTO),
                        new AlignmentOption("Start",
                                FlexComponent.Alignment.START),
                        new AlignmentOption("Center",
                                FlexComponent.Alignment.CENTER),
                        new AlignmentOption("End", FlexComponent.Alignment.END),
                        new AlignmentOption("Stretch",
                                FlexComponent.Alignment.STRETCH));

        RadioButtonGroup<AlignmentOption> layoutRadioGroup = new RadioButtonGroup<>();
        layoutRadioGroup.setLabel("Layout alignment");
        layoutRadioGroup.setItems(layoutOptions);
        layoutRadioGroup.setValue(layoutOptions.get(0));
        layoutRadioGroup.addValueChangeListener(
                e -> layout.setAlignItems(e.getValue().getAlignment()));

        RadioButtonGroup<AlignmentOption> itemRadioGroup = new RadioButtonGroup<>();
        itemRadioGroup.setLabel("Item 1: alignment");
        itemRadioGroup.setItems(itemOptions);
        itemRadioGroup.setValue(itemOptions.get(0));
        itemRadioGroup.addValueChangeListener(
                e -> layout.setAlignSelf(e.getValue().getAlignment(), item1));
        // end::snippet[]

        layout.getStyle().set("border", "1px solid var(--lumo-primary-color)");
        layout.getStyle().set("border-radius", "var(--lumo-border-radius-l)");

        this.add(layout, layoutRadioGroup, itemRadioGroup);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<BasicLayoutsVerticalLayoutIndividualAlignment> { // hidden-source-line
    } // hidden-source-line
}
