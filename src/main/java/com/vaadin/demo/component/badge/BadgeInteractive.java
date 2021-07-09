package com.vaadin.demo.component.badge;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("badge-interactive")
public class BadgeInteractive extends Div {

    public BadgeInteractive() {
        // tag::snippet1[]
        HorizontalLayout badges = new HorizontalLayout();
        badges.getStyle().set("flex-wrap", "wrap");

        ComboBox<String> comboBox = new ComboBox("Profession");
        comboBox.setItems(DataService.getProfessions());
        comboBox.addValueChangeListener(e -> badges.add(createBadge(e.getValue())));
        // end::snippet1[]

        VerticalLayout layout = new VerticalLayout(comboBox, badges);
        layout.setPadding(false);
        layout.setSizeUndefined();

        add(layout);
    }

    // tag::snippet2[]
    private Span createBadge(String profession) {
        Button button = new Button();
        button.getElement().appendChild(VaadinIcon.CLOSE_SMALL.create().getElement());
        button.addThemeVariants(ButtonVariant.LUMO_CONTRAST, ButtonVariant.LUMO_TERTIARY_INLINE);
        button.getStyle().set("margin-inline-start", "var(--lumo-space-xs)");
        // Accessible button name
        button.getElement().setAttribute("aria-label", "Clear filter: " + profession);
        // Tooltip
        button.getElement().setAttribute("title", "Clear filter: " + profession);

        Span badge = new Span(new Span(profession), button);
        badge.getElement().getThemeList().add("badge contrast pill");
        return badge;
    }
    // end::snippet2[]
    public static class Exporter extends DemoExporter<BadgeInteractive> { // hidden-source-line
    } // hidden-source-line
}
