package com.vaadin.demo.component.badge;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.badge.Badge;
import com.vaadin.flow.component.badge.BadgeVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("badge-dot")
public class BadgeDot extends HorizontalLayout {

    public BadgeDot() {
        // tag::snippet[]
        Badge pending = new Badge("Pending");
        pending.addThemeVariants(BadgeVariant.DOT);

        Badge confirmed = new Badge("Confirmed");
        confirmed.addThemeVariants(BadgeVariant.DOT, BadgeVariant.SUCCESS);

        Badge warning = new Badge("Warning");
        warning.addThemeVariants(BadgeVariant.DOT, BadgeVariant.WARNING);

        Badge denied = new Badge("Denied");
        denied.addThemeVariants(BadgeVariant.DOT, BadgeVariant.ERROR);

        // end::snippet[]

        add(pending, confirmed, warning, denied);
    }

    public static class Exporter extends DemoExporter<BadgeDot> { // hidden-source-line
    } // hidden-source-line
}
