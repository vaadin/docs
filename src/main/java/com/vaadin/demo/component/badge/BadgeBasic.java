package com.vaadin.demo.component.badge;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.badge.Badge;
import com.vaadin.flow.component.badge.BadgeVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("badge-basic")
public class BadgeBasic extends HorizontalLayout {

    public BadgeBasic() {
        // tag::snippet[]
        Badge pending = new Badge("Pending");

        Badge confirmed = new Badge("Confirmed");
        confirmed.addThemeVariants(BadgeVariant.SUCCESS);

        Badge warning = new Badge("Warning");
        warning.addThemeVariants(BadgeVariant.WARNING);

        Badge denied = new Badge("Denied");
        denied.addThemeVariants(BadgeVariant.ERROR);

        // end::snippet[]

        add(pending, confirmed, warning, denied);
    }

    public static class Exporter extends DemoExporter<BadgeBasic> { // hidden-source-line
    } // hidden-source-line
}
