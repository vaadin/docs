package com.vaadin.demo.component.badge;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("badge-color")
public class BadgeColor extends VerticalLayout {

    public BadgeColor() {
        // tag::snippet1[]
        // Default variant
        Span pending = new Span("Pending");
        pending.getElement().getThemeList().add("badge");
        // end::snippet1[]

        Span confirmed = new Span("Confirmed");
        confirmed.getElement().getThemeList().add("badge success");

        Span denied = new Span("Denied");
        denied.getElement().getThemeList().add("badge error");

        Span onHold = new Span("On hold");
        onHold.getElement().getThemeList().add("badge contrast");

        // tag::snippet2[]
        // Primary variant
        Span pendingPrimary = new Span("Pending");
        pendingPrimary.getElement().getThemeList().add("badge primary");
        // end::snippet2[]

        Span confirmedPrimary = new Span("Confirmed");
        confirmedPrimary.getElement().getThemeList().add("badge success primary");

        Span deniedPrimary = new Span("Denied");
        deniedPrimary.getElement().getThemeList().add("badge error primary");

        Span onHoldPrimary = new Span("On hold");
        onHoldPrimary.getElement().getThemeList().add("badge contrast primary");

        add(new HorizontalLayout(pending, confirmed, denied, onHold),
            new HorizontalLayout(pendingPrimary, confirmedPrimary, deniedPrimary, onHoldPrimary)
        );
        setPadding(false);
        setSizeUndefined();
    }
    public static class Exporter extends DemoExporter<BadgeColor> { // hidden-source-line
    } // hidden-source-line
}
