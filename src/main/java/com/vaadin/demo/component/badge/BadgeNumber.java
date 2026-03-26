package com.vaadin.demo.component.badge;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.badge.Badge;
import com.vaadin.flow.component.badge.BadgeVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("badge-number")
public class BadgeNumber extends HorizontalLayout {

    public BadgeNumber() {
        // tag::snippet[]
        Badge inbox = new Badge("Inbox", 12);

        Badge completed = new Badge("Completed", 3);
        completed.addThemeVariants(BadgeVariant.SUCCESS);

        Badge failed = new Badge("Failed", 1);
        failed.addThemeVariants(BadgeVariant.ERROR);
        // end::snippet[]

        add(inbox, completed, failed);
    }

    public static class Exporter extends DemoExporter<BadgeNumber> { // hidden-source-line
    } // hidden-source-line
}
