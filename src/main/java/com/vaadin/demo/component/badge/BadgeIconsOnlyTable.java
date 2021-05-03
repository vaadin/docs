package com.vaadin.demo.component.badge;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.router.Route;

@Route("badge-icons-only-table")
public class BadgeIconsOnlyTable extends Div {

    public BadgeIconsOnlyTable() {
        // tag::snippet[]

        Span badge = new Span("Badge");
        badge.getElement().getThemeList().add("badge pill contrast");

        add(badge);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<BadgeIconsOnlyTable> { // hidden-source-line
    } // hidden-source-line
}
