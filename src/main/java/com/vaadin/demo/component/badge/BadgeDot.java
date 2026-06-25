package com.vaadin.demo.component.badge;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.badge.Badge;
import com.vaadin.flow.component.badge.BadgeVariant;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.dom.Style.Position;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.theme.lumo.LumoIcon;

@Route("badge-dot")
public class BadgeDot extends HorizontalLayout {

    public BadgeDot() {
        setAlignItems(Alignment.CENTER);

        // tag::snippet[]
        Badge pending = new Badge("Pending");
        pending.addThemeVariants(BadgeVariant.DOT);

        Badge confirmed = new Badge("Confirmed");
        confirmed.addThemeVariants(BadgeVariant.DOT, BadgeVariant.SUCCESS);

        Badge warning = new Badge("Warning");
        warning.addThemeVariants(BadgeVariant.DOT, BadgeVariant.WARNING);

        Badge denied = new Badge("Denied");
        denied.addThemeVariants(BadgeVariant.DOT, BadgeVariant.ERROR);

        Button downloadsButton = new Button(LumoIcon.DOWNLOAD.create());
        // Only for Lumo
        downloadsButton.addThemeVariants(ButtonVariant.LUMO_ICON);

        Badge completed = new Badge("completed", 3);
        completed.addThemeVariants(BadgeVariant.DOT, BadgeVariant.SUCCESS);
        completed.getStyle().setPosition(Position.ABSOLUTE);
        completed.getStyle().setTop("0.3em");
        completed.getStyle().setRight("0.3em");
        downloadsButton.setSuffixComponent(completed);

        // end::snippet[]

        add(pending, confirmed, warning, denied, downloadsButton);
    }

    public static class Exporter extends DemoExporter<BadgeDot> { // hidden-source-line
    } // hidden-source-line
}
