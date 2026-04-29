package com.vaadin.demo.component.badge;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.badge.Badge;
import com.vaadin.flow.component.badge.BadgeVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("badge-color")
public class BadgeColor extends VerticalLayout {

    public BadgeColor() {
        // tag::snippet1[]
        // Default variant
        Badge pending = new Badge("Pending");
        // end::snippet1[]

        Badge confirmed = new Badge("Confirmed");
        confirmed.addThemeVariants(BadgeVariant.SUCCESS);

        Badge warning = new Badge("Warning");
        warning.addThemeVariants(BadgeVariant.WARNING);

        Badge denied = new Badge("Denied");
        denied.addThemeVariants(BadgeVariant.ERROR);

        // tag::snippet2[]
        // Filled variant
        Badge pendingFilled = new Badge("Pending");
        pendingFilled.addThemeVariants(BadgeVariant.FILLED);
        // end::snippet2[]

        Badge confirmedFilled = new Badge("Confirmed");
        confirmedFilled.addThemeVariants(BadgeVariant.SUCCESS,
                BadgeVariant.FILLED);

        Badge warningFilled = new Badge("Warning");
        warningFilled.addThemeVariants(BadgeVariant.WARNING,
                BadgeVariant.FILLED);

        Badge deniedFilled = new Badge("Denied");
        deniedFilled.addThemeVariants(BadgeVariant.ERROR, BadgeVariant.FILLED);

        add(new HorizontalLayout(pending, confirmed, warning, denied),
                new HorizontalLayout(pendingFilled, confirmedFilled,
                        warningFilled, deniedFilled));
        setPadding(false);
        setSizeUndefined();
    }

    public static class Exporter extends DemoExporter<BadgeColor> { // hidden-source-line
    } // hidden-source-line
}
