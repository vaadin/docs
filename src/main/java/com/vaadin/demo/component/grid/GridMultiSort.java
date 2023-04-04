package com.vaadin.demo.component.grid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.Grid.MultiSortPriority;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.data.renderer.LocalDateRenderer;
import com.vaadin.flow.router.Route;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

@Route("grid-multisort")
public class GridMultiSort extends Div {

    public GridMultiSort() {
        // tag::snippet[]
        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.addColumn(Person::getId).setHeader("Id").setSortable(true);
        grid.addColumn(Person::getFullName).setHeader("Name").setSortable(true);
        grid.addColumn(Person::getEmail).setHeader("Email").setSortable(true);
        grid.addColumn(Person::getProfession).setHeader("Profession")
                .setSortable(true);
        grid.addColumn(new LocalDateRenderer<>(GridMultiSort::getPersonBirthday,
                "yyyy-MM-dd")).setHeader("Birthday").setSortable(true)
                .setComparator(Person::getBirthday);
        grid.setMultiSort(true, MultiSortPriority.APPEND);
        // end::snippet[]

        List<Person> people = DataService.getPeople();
        grid.setItems(people);

        add(grid);
    }

    private static LocalDate getPersonBirthday(Person person) {
        return person.getBirthday().toInstant().atZone(ZoneId.systemDefault())
                .toLocalDate();
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridMultiSort> { // hidden-source-line
    } // hidden-source-line
}
