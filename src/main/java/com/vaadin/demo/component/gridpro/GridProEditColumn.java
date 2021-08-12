package com.vaadin.demo.component.gridpro;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.gridpro.GridPro;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;

import java.util.List;

@Route("grid-pro-edit-column")
public class GridProEditColumn extends Div {

    public GridProEditColumn() {
        // tag::snippet[]
        GridPro<Person> grid = new GridPro<>();

        grid.addColumn(Person::getFullName)
                .setHeader("Name (read-only)");

        grid.addEditColumn(Person::getProfession)
                .text(Person::setProfession)
                .setHeader("Profession (editable)");
        // end::snippet[]

        List<Person> people = DataService.getPeople();
        grid.setItems(people);

        add(grid);
    }

    public static class Exporter extends DemoExporter<GridProEditColumn> { // hidden-source-line
    } // hidden-source-line
}

