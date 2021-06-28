package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.router.Route;

@Route("basic-layouts/spacing-variants")
public class BasicLayoutsSpacingVariants extends Div {

    private static final String SPACING_XS_THEME = "spacing-xs";
    private static final String SPACING_S_THEME = "spacing-s";
    private static final String SPACING_THEME = "spacing";
    private static final String SPACING_L_THEME = "spacing-l";
    private static final String SPACING_XL_THEME = "spacing-xl";

    public BasicLayoutsSpacingVariants() {
        // tag::snippet[]
        VerticalLayout layout = new VerticalLayout();
        layout.setSpacing(false);
        layout.getThemeList().add(SPACING_XL_THEME);
        layout.setAlignItems(FlexComponent.Alignment.STRETCH);
        layout.add(new LayoutItem("Item 1"));
        layout.add(new LayoutItem("Item 2"));
        layout.add(new LayoutItem("Item 3"));

        RadioButtonGroup<String> radioButtonGroup = new RadioButtonGroup<>();
        radioButtonGroup.setLabel("Spacing variant");
        radioButtonGroup
                .setItems(SPACING_XS_THEME, SPACING_S_THEME, SPACING_THEME,
                        SPACING_L_THEME, SPACING_XL_THEME);
        radioButtonGroup.setValue(SPACING_XL_THEME);
        radioButtonGroup.addValueChangeListener(e -> {
            layout.getThemeList().remove(e.getOldValue());
            layout.getThemeList().add(e.getValue());
        });
        // end::snippet[]

        this.setClassName("basic-layouts-example");
        layout.setClassName("height-5xl");

        this.add(layout, radioButtonGroup);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<BasicLayoutsSpacingVariants> { // hidden-source-line
    } // hidden-source-line
}
