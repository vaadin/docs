package com.vaadin.demo.component.gridpro;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.gridpro.GridPro;
import com.vaadin.flow.component.gridpro.GridProVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;

import java.util.List;

@Route("grid-pro-highlight-read-only-cells")
public class GridProThemeHighlightReadOnlyCells extends Div {

    public GridProThemeHighlightReadOnlyCells() {
        // tag::snippet[]
        GridPro<Person> grid = new GridPro<>();
        grid.addThemeVariants(GridProVariant.LUMO_HIGHLIGHT_READ_ONLY_CELLS);
        // end::snippet[]

        grid.addColumn(Person::getFirstName).setHeader("First name");
        grid.addColumn(Person::getLastName).setHeader("Last name");
        grid.addColumn(Person::getMembership).setHeader("Membership");

        grid.addEditColumn(Person::getEmail).text(Person::setEmail)
                .setHeader("Email (Editable)");

        List<Person> people = DataService.getPeople();
        grid.setItems(people);

        add(grid);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<GridProThemeHighlightReadOnlyCells> { // hidden-source-line
    } // hidden-source-line
}
