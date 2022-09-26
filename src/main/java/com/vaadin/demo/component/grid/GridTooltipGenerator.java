package com.vaadin.demo.component.grid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.GridVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.data.renderer.LitRenderer;
import com.vaadin.flow.data.renderer.Renderer;
import com.vaadin.flow.router.Route;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Route("grid-tooltip-generator")
public class GridTooltipGenerator extends Div {

    public GridTooltipGenerator() {
        // tag::snippet[]
        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.addColumn(Person::getFirstName).setHeader("First name");
        grid.addColumn(Person::getLastName).setHeader("Last name");
        grid.addColumn(person -> {
            LocalDate birthday = person.getBirthday().toInstant()
                    .atZone(ZoneId.systemDefault()).toLocalDate();
            return birthday.format(birthdayFormatter);
        }).setHeader("Birthday");
        grid.addComponentColumn(person ->
                createStatusIcon(person.getStatus()))
                .setHeader("Status");
        // end::snippet[]

        List<Person> people = DataService.getPeople();
        grid.setItems(people);

        add(grid);
    }

    private static final DateTimeFormatter birthdayFormatter = DateTimeFormatter
            .ofPattern("yyyy-MM-dd");

    private Icon createStatusIcon(String status) {
        boolean isAvailable = "Available".equals(status);
        Icon icon;
        if (isAvailable) {
            icon = VaadinIcon.CHECK.create();
            icon.getElement().getThemeList().add("badge success");
        } else {
            icon = VaadinIcon.CLOSE_SMALL.create();
            icon.getElement().getThemeList().add("badge error");
        }
        icon.getStyle().set("padding", "var(--lumo-space-xs");
        return icon;
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridTooltipGenerator> { // hidden-source-line
    } // hidden-source-line
}
