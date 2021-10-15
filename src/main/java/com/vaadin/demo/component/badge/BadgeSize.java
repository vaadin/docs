package com.vaadin.demo.component.badge;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("badge-size")
public class BadgeSize extends HorizontalLayout {

    public BadgeSize() {
        // tag::snippet[]
        Span pending = new Span("Pending");
        pending.getElement().getThemeList().add("badge small");

        Span confirmed = new Span("Confirmed");
        confirmed.getElement().getThemeList().add("badge success small");

        Span denied = new Span("Denied");
        denied.getElement().getThemeList().add("badge error small");

        Span onHold = new Span("On hold");
        onHold.getElement().getThemeList().add("badge contrast small");
        // end::snippet[]

        add(pending, confirmed, denied, onHold);
    }
    public static class Exporter extends DemoExporter<BadgeSize> { // hidden-source-line
    } // hidden-source-line
}
