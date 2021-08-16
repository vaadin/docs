package com.vaadin.demo.component.grid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.data.renderer.LitRenderer;
import com.vaadin.flow.data.renderer.Renderer;
import com.vaadin.flow.router.Route;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Route("grid-rich-content-sorting")
public class GridRichContentSorting extends Div {

    public GridRichContentSorting() {
        // tag::snippet[]
        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.addColumn(createEmployeeRenderer()).setHeader("Employee")
                .setAutoWidth(true).setFlexGrow(0)
                .setComparator(Person::getLastName);
        grid.addColumn(createBirthdayRenderer()).setHeader("Birthdate")
                .setComparator(Person::getBirthday);
        // end::snippet[]

        List<Person> people = DataService.getPeople();
        grid.setItems(people);

        add(grid);
    }

    private static Renderer<Person> createEmployeeRenderer() {
        return LitRenderer.<Person>of(
                "<vaadin-horizontal-layout style=\"align-items: center;\" theme=\"spacing\">"
                        + "  <vaadin-avatar img=\"${item.pictureUrl}\" name=\"${item.fullName}\"></vaadin-avatar>"
                        + "  <vaadin-vertical-layout style=\"line-height: var(--lumo-line-height-m);\">"
                        + "    <span> ${item.fullName} </span>"
                        + "    <span style=\"font-size: var(--lumo-font-size-s); color: var(--lumo-secondary-text-color);\">"
                        + "      ${item.email}" + "    </span>"
                        + "  </vaadin-vertical-layout>"
                        + "</vaadin-horizontal-layout>")
                .withProperty("pictureUrl", Person::getPictureUrl)
                .withProperty("fullName", Person::getFullName)
                .withProperty("email", Person::getEmail);
    }

    private static Renderer<Person> createBirthdayRenderer() {
        return LitRenderer.<Person>of(
                "<vaadin-vertical-layout style=\"line-height: var(--lumo-line-height-m);\">"
                        + "  <span>${item.birthday}</span>"
                        + "  <span style=\"font-size: var(--lumo-font-size-s); color: var(--lumo-secondary-text-color);\">Age: ${item.age}</span>"
                        + "</vaadin-vertical-layout>").withProperty("birthday",
                GridRichContentSorting::getFormattedPersonBirthday)
                .withProperty("age", GridRichContentSorting::getPersonAge);
    }

    private static final DateTimeFormatter birthdayFormatter = DateTimeFormatter
            .ofPattern("MM/dd/yyyy");

    private static String getFormattedPersonBirthday(Person person) {
        LocalDate birthday = person.getBirthday().toInstant()
                .atZone(ZoneId.systemDefault()).toLocalDate();

        return birthday.format(birthdayFormatter);
    }

    private static int getPersonAge(Person person) {
        LocalDate birthday = person.getBirthday().toInstant()
                .atZone(ZoneId.systemDefault()).toLocalDate();

        return LocalDate.now(ZoneId.systemDefault()).getYear() - birthday
                .getYear();
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridRichContentSorting> { // hidden-source-line
    } // hidden-source-line
}
