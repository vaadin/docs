package com.vaadin.demo.component.grid;

import java.util.List;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;

@Route("grid-column-header-footer")
public class GridColumnHeaderFooter extends Div {

    public GridColumnHeaderFooter() {
        // tag::snippet1[]
        List<Person> people = DataService.getPeople();

        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.addColumn(Person::getFullName).setHeader("Name")
                .setFooter(String.format("%s total members", people.size()));
        grid.addColumn(person -> person.isSubscriber() ? "Yes" : "No")
                .setHeader(createSubscriberHeader())
                .setFooter(createSubscriberFooterText(people));
        grid.addColumn(Person::getMembership)
                .setHeader(createMembershipHeader())
                .setFooter(createMembershipFooterText(people));
        // end::snippet1[]

        grid.setItems(people);

        add(grid);
    }

    // tag::snippet2[]
    private static Component createSubscriberHeader() {
        Span span = new Span("Subscriber");
        Icon icon = VaadinIcon.INFO_CIRCLE.create();
        icon.getElement()
                .setAttribute("title", "Subscribers are paying customers");
        icon.getStyle().set("height", "var(--lumo-font-size-m)")
                .set("color", "var(--lumo-contrast-70pct)");

        HorizontalLayout layout = new HorizontalLayout(span, icon);
        layout.setAlignItems(FlexComponent.Alignment.CENTER);
        layout.setSpacing(false);

        return layout;
    }

    private static String createSubscriberFooterText(List<Person> people) {
        long subscriberCount = people.stream().filter(Person::isSubscriber)
                .count();

        return String.format("%s subscribers", subscriberCount);
    }

    private static Component createMembershipHeader() {
        Span span = new Span("Membership");
        Icon icon = VaadinIcon.INFO_CIRCLE.create();
        icon.getElement().setAttribute("title",
                "Membership levels determines which features a client has access to");
        icon.getStyle().set("height", "var(--lumo-font-size-m)")
                .set("color", "var(--lumo-contrast-70pct)");

        HorizontalLayout layout = new HorizontalLayout(span, icon);
        layout.setAlignItems(FlexComponent.Alignment.CENTER);
        layout.setSpacing(false);

        return layout;
    }

    private static String createMembershipFooterText(List<Person> people) {
        long regularCount = people.stream()
                .filter(person -> "Regular".equals(person.getMembership()))
                .count();
        long premiumCount = people.stream()
                .filter(person -> "Premium".equals(person.getMembership()))
                .count();
        long vipCount = people.stream()
                .filter(person -> "VIP".equals(person.getMembership())).count();

        return String.format("%s regular, %s premium, %s VIP", regularCount,
                premiumCount, vipCount);
    }
    // end::snippet2[]

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridColumnHeaderFooter> { // hidden-source-line
    } // hidden-source-line
}
