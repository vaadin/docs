package com.vaadin.demo.component.grid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.badge.Badge;
import com.vaadin.flow.component.badge.BadgeVariant;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.router.Route;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Route("grid-tooltip-generator")
public class GridTooltipGenerator extends Div {

    public GridTooltipGenerator() {
        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.addColumn(Person::getFirstName).setHeader("First name");
        grid.addColumn(Person::getLastName).setHeader("Last name");
        // tag::snippet[]
        grid.addColumn(person -> getFormattedPersonBirthday(person))
                .setTooltipGenerator(person -> "Age: " + getPersonAge(person))
                .setHeader("Birthday");
        grid.addComponentColumn(person -> createStatusBadge(person.getStatus()))
                .setTooltipGenerator(person -> person.getStatus())
                .setHeader("Status");
        // end::snippet[]

        List<Person> people = DataService.getPeople();
        grid.setItems(people);
        grid.setSelectionMode(Grid.SelectionMode.NONE);

        add(grid);
    }

    private static final DateTimeFormatter birthdayFormatter = DateTimeFormatter
            .ofPattern("yyyy-MM-dd");

    private int getPersonAge(Person person) {
        LocalDate birthday = person.getBirthday().toInstant()
                .atZone(ZoneId.systemDefault()).toLocalDate();

        return LocalDate.now(ZoneId.systemDefault()).getYear()
                - birthday.getYear();
    }

    private String getFormattedPersonBirthday(Person person) {
        LocalDate birthday = person.getBirthday().toInstant()
                .atZone(ZoneId.systemDefault()).toLocalDate();

        return birthday.format(birthdayFormatter);
    }

    private Badge createStatusBadge(String status) {
        boolean isAvailable = "Available".equals(status);
        Badge badge = new Badge();
        badge.setIcon(isAvailable ? VaadinIcon.CHECK.create()
                : VaadinIcon.CLOSE_SMALL.create());
        badge.addThemeVariants(BadgeVariant.ICON_ONLY,
                isAvailable ? BadgeVariant.SUCCESS : BadgeVariant.ERROR);
        return badge;
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridTooltipGenerator> { // hidden-source-line
    } // hidden-source-line
}
