package com.vaadin.demo.component.badge;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.badge.Badge;
import com.vaadin.flow.component.badge.BadgeVariant;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("badge-icons")
public class BadgeIcons extends HorizontalLayout {

    public BadgeIcons() {
        // tag::snippet[]
        Badge pending = new Badge("Pending", VaadinIcon.CLOCK.create());

        Badge confirmed = new Badge("Confirmed", VaadinIcon.CHECK.create());
        confirmed.addThemeVariants(BadgeVariant.SUCCESS);

        Badge warning = new Badge("Warning", VaadinIcon.WARNING.create());
        warning.addThemeVariants(BadgeVariant.WARNING);

        Badge denied = new Badge("Denied",
                VaadinIcon.EXCLAMATION_CIRCLE_O.create());
        denied.addThemeVariants(BadgeVariant.ERROR);

        // end::snippet[]

        add(pending, confirmed, warning, denied);
    }

    public static class Exporter extends DemoExporter<BadgeIcons> { // hidden-source-line
    } // hidden-source-line
}
