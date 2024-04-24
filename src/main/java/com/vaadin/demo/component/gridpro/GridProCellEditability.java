package com.vaadin.demo.component.gridpro;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.gridpro.GridPro;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import java.util.List;

@Route("grid-pro-cell-editability")
public class GridProCellEditability extends Div {
    public GridProCellEditability() {
        GridPro<Person> grid = new GridPro<>();

        grid.addEditColumn(Person::getFirstName).text(Person::setFirstName)
                .setHeader("First name");

        grid.addEditColumn(Person::getLastName).text(Person::setLastName)
                .setHeader("Last name");

        // tag::snippet[]
        grid.addEditColumn(Person::getEmail)
                .withCellEditableProvider(item -> item.isSubscriber())
                .text(Person::setEmail).setHeader("Email");
        // end::snippet[]

        grid.addEditColumn(Person::isSubscriber).checkbox(Person::setSubscriber)
                .setHeader("Subscriber");

        List<Person> people = DataService.getPeople();
        grid.setItems(people);
        add(grid);
    }

    public static class Exporter extends DemoExporter<GridProCellEditability> { // hidden-source-line
    } // hidden-source-line
}
