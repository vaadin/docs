package com.vaadin.demo.component.badge;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("badge-interactive")
public class BadgeInteractive extends VerticalLayout {

    public BadgeInteractive() {
        // tag::snippet1[]
        HorizontalLayout badges = new HorizontalLayout();
        badges.getStyle().set("flex-wrap", "wrap");

        ComboBox<String> comboBox = new ComboBox<>("Profession");
        comboBox.setItems(DataService.getProfessions());
        comboBox.addValueChangeListener(e -> {
            Span filterBadge = createFilterBadge(e.getValue());
            badges.add(filterBadge);
        });
        // end::snippet1[]

        add(comboBox, badges);
        setPadding(false);
        setSizeUndefined();
    }

    // tag::snippet2[]
    private Span createFilterBadge(String profession) {
        Button clearButton = new Button(VaadinIcon.CLOSE_SMALL.create());
        clearButton.addThemeVariants(ButtonVariant.LUMO_CONTRAST, ButtonVariant.LUMO_TERTIARY_INLINE);
        clearButton.getStyle().set("margin-inline-start", "var(--lumo-space-xs)");
        // Accessible button name
        clearButton.getElement().setAttribute("aria-label", "Clear filter: " + profession);
        // Tooltip
        clearButton.getElement().setAttribute("title", "Clear filter: " + profession);

        Span badge = new Span(new Span(profession), clearButton);
        badge.getElement().getThemeList().add("badge contrast pill");

        // Add handler for removing the badge
        clearButton.addClickListener(event -> {
            badge.getElement().removeFromParent();
        });

        return badge;
    }
    // end::snippet2[]
    public static class Exporter extends DemoExporter<BadgeInteractive> { // hidden-source-line
    } // hidden-source-line
}
