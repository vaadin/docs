package com.vaadin.demo.component.badge;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("badge-color")
public class BadgeColor extends Div {

    public BadgeColor() {
        // tag::snippet1[]
        // Default variant
        Span pending1 = new Span("Pending");
        pending1.getElement().getThemeList().add("badge");
        // end::snippet1[]

        Span confirmed1 = new Span("Confirmed");
        confirmed1.getElement().getThemeList().add("badge success");

        Span denied1 = new Span("Denied");
        denied1.getElement().getThemeList().add("badge error");

        Span onHold1 = new Span("On hold");
        onHold1.getElement().getThemeList().add("badge contrast");

        // tag::snippet2[]
        // Primary variant
        Span pending2 = new Span("Pending");
        pending2.getElement().getThemeList().add("badge primary");
        // end::snippet2[]

        Span confirmed2 = new Span("Confirmed");
        confirmed2.getElement().getThemeList().add("badge success primary");

        Span denied2 = new Span("Denied");
        denied2.getElement().getThemeList().add("badge error primary");

        Span onHold2 = new Span("On hold");
        onHold2.getElement().getThemeList().add("badge contrast primary");

        VerticalLayout layout = new VerticalLayout(
                new HorizontalLayout(pending1, confirmed1, denied1, onHold1),
                new HorizontalLayout(pending2, confirmed2, denied2, onHold2)
        );
        layout.setPadding(false);
        layout.setSizeUndefined();
        add(layout);
    }
    public static class Exporter extends DemoExporter<BadgeColor> { // hidden-source-line
    } // hidden-source-line
}
