package com.vaadin.demo.component.badge;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("badge-shape")
public class BadgeShape extends HorizontalLayout {

    public BadgeShape() {
        // tag::snippet[]
        Span pending = new Span("Pending");
        pending.getElement().getThemeList().add("badge pill");

        Span confirmed = new Span("Confirmed");
        confirmed.getElement().getThemeList().add("badge success pill");

        Span warning = new Span("Warning");
        warning.getElement().getThemeList().add("badge warning pill");

        Span denied = new Span("Denied");
        denied.getElement().getThemeList().add("badge error pill");

        Span onHold = new Span("On hold");
        onHold.getElement().getThemeList().add("badge contrast pill");
        // end::snippet[]

        add(pending, confirmed, warning, denied, onHold);
    }

    public static class Exporter extends DemoExporter<BadgeShape> { // hidden-source-line
    } // hidden-source-line
}
