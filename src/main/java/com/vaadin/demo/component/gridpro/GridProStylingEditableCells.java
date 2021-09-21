package com.vaadin.demo.component.gridpro;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.gridpro.GridPro;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;

import java.util.List;

@Route("vaadin-grid-pro-editable-cells")
public class GridProStylingEditableCells extends Div {

    public GridProStylingEditableCells() {
        // tag::snippet[]
        GridPro<Person> grid = new GridPro<>();
        grid.addClassNames("editable-custom-effect");

        grid.addColumn(Person::getFirstName).setHeader("First name");
        grid.addColumn(Person::getLastName).setHeader("Last name");
        grid.addColumn(Person::getMembership).setHeader("Membership");

        grid.addEditColumn(Person::getEmail)
                .text(Person::setEmail)
                .setHeader("Email (Editable)");
        // end::snippet[]

        List<Person> people = DataService.getPeople();
        grid.setItems(people);

        add(grid);
    }

    public static class Exporter extends DemoExporter<GridProStylingEditableCells> { // hidden-source-line
    } // hidden-source-line
}



