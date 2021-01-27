package com.vaadin.demo.component.badge;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.router.Route;

@Route("badge-highlight")
public class BadgeHighlight extends Div {

    public BadgeHighlight() {
        // tag::snippet[]

        Span badge = new Span("Badge");
        badge.getElement().getThemeList().add("badge pill contrast");

        add(badge);
    }

    public static class Exporter extends DemoExporter<BadgeHighlight> { // hidden-full-source-line
    } // hidden-full-source-line
}
