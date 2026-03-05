package com.vaadin.demo.component.badge;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.flow.component.badge.Badge;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("badge-interactive")
public class BadgeInteractive extends VerticalLayout {

    public BadgeInteractive() {
        // tag::snippet1[]
        HorizontalLayout badges = new HorizontalLayout();
        badges.addThemeNames("wrap");

        ComboBox<String> comboBox = new ComboBox<>("Profession");
        comboBox.setItems(DataService.getProfessions());
        comboBox.addValueChangeListener(e -> {
            Badge filterBadge = createFilterBadge(e.getValue());
            badges.add(filterBadge);
        });
        // end::snippet1[]

        add(comboBox, badges);
        setPadding(false);
        setSizeUndefined();
    }

    // tag::snippet2[]
    private Badge createFilterBadge(String profession) {
        Button clearButton = new Button(VaadinIcon.CLOSE_SMALL.create());
        clearButton.addThemeVariants(ButtonVariant.TERTIARY);
        clearButton.getStyle().set("height", "1.5rem")
                .set("min-width", "1.5rem").set("margin", "0")
                .set("padding", "0");
        // Accessible button name
        clearButton.getElement().setAttribute("aria-label",
                "Clear filter: " + profession);
        // Tooltip
        clearButton.getElement().setAttribute("title",
                "Clear filter: " + profession);

        Badge badge = new Badge(profession);
        badge.getStyle().set("padding-right", "0");
        badge.getElement().appendChild(clearButton.getElement());

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
