package com.vaadin.demo.component.splitlayout;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.component.splitlayout.SplitLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("split-layout-theme-variants")
public class SplitLayoutThemeVariants extends Div {

    public SplitLayoutThemeVariants() {
        // tag::snippet[]
        SplitLayout splitLayout = new SplitLayout(new Span("Side 1"), new Span("Side 2"));
        add(splitLayout);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<SplitLayoutThemeVariants> { // hidden-source-line
    } // hidden-source-line
}
