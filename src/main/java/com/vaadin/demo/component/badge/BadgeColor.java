package com.vaadin.demo.component.badge;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.router.Route;

@Route("badge-color")
public class BadgeColor extends Div {

    public BadgeColor() {
        // tag::snippet[]

        Span badge = new Span("Badge");
        badge.getElement().getThemeList().add("badge pill contrast");

        add(badge);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<BadgeColor> { // hidden-source-line
    } // hidden-source-line
}
