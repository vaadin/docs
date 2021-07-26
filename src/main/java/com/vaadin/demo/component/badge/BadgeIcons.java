package com.vaadin.demo.component.badge;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("badge-icons")
public class BadgeIcons extends VerticalLayout {

    public BadgeIcons() {
        // tag::snippet1[]
        // Icon before text
        Span pending1 = new Span(createIcon(VaadinIcon.CLOCK), new Span("Pending"));
        pending1.getElement().getThemeList().add("badge");
        // end::snippet1[]

        Span confirmed1 = new Span(createIcon(VaadinIcon.CHECK), new Span("Confirmed"));
        confirmed1.getElement().getThemeList().add("badge success");

        Span denied1 = new Span(createIcon(VaadinIcon.EXCLAMATION_CIRCLE_O), new Span("Denied"));
        denied1.getElement().getThemeList().add("badge error");

        Span onHold1 = new Span(createIcon(VaadinIcon.HAND), new Span("On hold"));
        onHold1.getElement().getThemeList().add("badge contrast");

        // tag::snippet2[]
        // Icon after text
        Span pending2 = new Span(new Span("Pending"), createIcon(VaadinIcon.CLOCK));
        pending2.getElement().getThemeList().add("badge");
        // end::snippet2[]

        Span confirmed2 = new Span(new Span("Confirmed"), createIcon(VaadinIcon.CHECK));
        confirmed2.getElement().getThemeList().add("badge success");

        Span denied2 = new Span(new Span("Denied"), createIcon(VaadinIcon.EXCLAMATION_CIRCLE_O));
        denied2.getElement().getThemeList().add("badge error");

        Span onHold2 = new Span(new Span("On hold"), createIcon(VaadinIcon.HAND));
        onHold2.getElement().getThemeList().add("badge contrast");

        add(new HorizontalLayout(pending1, confirmed1, denied1, onHold1),
            new HorizontalLayout(pending2, confirmed2, denied2, onHold2)
        );
        setPadding(false);
        setSizeUndefined();
    }

    // tag::snippet3[]
    private Icon createIcon(VaadinIcon vaadinIcon) {
        Icon icon = vaadinIcon.create();
        icon.getStyle().set("padding", "var(--lumo-space-xs");
        return icon;
    }
    // end::snippet3[]
    public static class Exporter extends DemoExporter<BadgeIcons> { // hidden-source-line
    } // hidden-source-line
}
