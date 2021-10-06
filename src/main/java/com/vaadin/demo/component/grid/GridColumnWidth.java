package com.vaadin.demo.component.grid;

import java.util.List;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.splitlayout.SplitLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;

@Route("grid-column-width")
public class GridColumnWidth extends Div {

    public GridColumnWidth() {
        // tag::snippet[]
        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.setSelectionMode(Grid.SelectionMode.MULTI);
        grid.addColumn(Person::getFirstName).setHeader("First name")
                .setWidth("7em").setFlexGrow(0);
        grid.addColumn(Person::getProfession).setHeader("Profession")
                .setAutoWidth(true).setFlexGrow(0);
        grid.addColumn(Person::getEmail).setHeader("Email");
        grid.addColumn(person -> person.isSubscriber() ? "Yes" : "No")
                .setHeader("Has Sub").setWidth("6em").setFlexGrow(0);
        // end::snippet[]

        List<Person> people = DataService.getPeople();
        grid.setItems(people);
        grid.setWidth("100%");

        SplitLayout splitLayout = new SplitLayout(grid, new Div());
        add(splitLayout);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridColumnWidth> { // hidden-source-line
    } // hidden-source-line
}
