package com.vaadin.demo.component.badge;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("badge-icons-only")
public class BadgeIconsOnly extends HorizontalLayout {

    public BadgeIconsOnly() {
        // tag::snippet1[]
        Icon confirmed = createIcon(VaadinIcon.CHECK, "Confirmed");
        confirmed.getElement().getThemeList().add("badge success");

        Icon cancelled = createIcon(VaadinIcon.CLOSE_SMALL, "Cancelled");
        cancelled.getElement().getThemeList().add("badge error");
        // end::snippet1[]

        add(confirmed, cancelled);
    }

    // tag::snippet2[]
    private Icon createIcon(VaadinIcon vaadinIcon, String label) {
        Icon icon = vaadinIcon.create();
        icon.getStyle().set("padding", "var(--lumo-space-xs");
        // Accessible label
        icon.getElement().setAttribute("aria-label", label);
        // Tooltip
        icon.getElement().setAttribute("title", label);
        return icon;
    }
    // end::snippet2[]
    public static class Exporter extends DemoExporter<BadgeIconsOnly> { // hidden-source-line
    } // hidden-source-line
}
