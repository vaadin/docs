package com.vaadin.demo.component.badge;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.badge.Badge;
import com.vaadin.flow.component.badge.BadgeVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("badge-number-only")
public class BadgeNumberOnly extends HorizontalLayout {

    public BadgeNumberOnly() {
        // tag::snippet[]
        Badge inbox = new Badge("New messages", 12);
        inbox.addThemeVariants(BadgeVariant.NUMBER_ONLY);

        Badge alerts = new Badge("Alerts", 3);
        alerts.addThemeVariants(BadgeVariant.ERROR, BadgeVariant.NUMBER_ONLY);
        // end::snippet[]

        add(inbox, alerts);
    }

    public static class Exporter extends DemoExporter<BadgeNumberOnly> { // hidden-source-line
    } // hidden-source-line
}
