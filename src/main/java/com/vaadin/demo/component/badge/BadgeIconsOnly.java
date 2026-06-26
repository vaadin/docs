package com.vaadin.demo.component.badge;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.badge.Badge;
import com.vaadin.flow.component.badge.BadgeVariant;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("badge-icons-only")
public class BadgeIconsOnly extends HorizontalLayout {

    public BadgeIconsOnly() {
        // tag::snippet[]
        Badge confirmed = new Badge("Confirmed", VaadinIcon.CHECK.create());
        confirmed.addThemeVariants(BadgeVariant.SUCCESS,
                BadgeVariant.ICON_ONLY);

        Badge cancelled = new Badge("Cancelled",
                VaadinIcon.CLOSE_SMALL.create());
        cancelled.addThemeVariants(BadgeVariant.ERROR, BadgeVariant.ICON_ONLY);
        // end::snippet[]

        add(confirmed, cancelled);
    }

    public static class Exporter extends DemoExporter<BadgeIconsOnly> { // hidden-source-line
    } // hidden-source-line
}
