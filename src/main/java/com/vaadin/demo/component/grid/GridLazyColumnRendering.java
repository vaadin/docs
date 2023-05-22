package com.vaadin.demo.component.grid;

import java.util.List;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.ColumnRendering;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.data.renderer.LitRenderer;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;

@Route("grid-lazy-column-rendering")
public class GridLazyColumnRendering extends Div {

    public GridLazyColumnRendering() {

        Grid<Person> grid = new Grid<>(Person.class, false);
        // tag::snippet[]
        grid.setColumnRendering(ColumnRendering.LAZY);
        // end::snippet[]

        grid.addColumn(LitRenderer.of("Row ${index}")).setFrozen(true);

        // Generate 100 columns
        for (int i = 0; i < 100; i++) {
            grid.addColumn(LitRenderer.of(i + " - ${index}"))
                    .setHeader("Col " + i);
        }

        List<Person> people = DataService.getPeople();
        grid.setItems(people);

        add(grid);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridLazyColumnRendering> { // hidden-source-line
    } // hidden-source-line
}
