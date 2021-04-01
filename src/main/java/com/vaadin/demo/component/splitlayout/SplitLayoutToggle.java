package com.vaadin.demo.component.splitlayout;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.component.splitlayout.SplitLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("split-layout-toggle")
public class SplitLayoutToggle extends Div {

    public SplitLayoutToggle() {
        // tag::snippet[]
        SplitLayout splitLayout = new SplitLayout(new Span("Side 1"), new Span("Side 2"));
        add(splitLayout);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<SplitLayoutToggle> { // hidden-full-source-line
    } // hidden-full-source-line
}
