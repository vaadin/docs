package com.vaadin.demo.component.grid;

import java.util.List;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.data.renderer.TemplateRenderer;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.demo.domain.DataService;

@Route("grid-column-width")
public class GridColumnWidth extends Div {

    public GridColumnWidth() {
        // tag::snippet[]
        Grid<Person> grid = new Grid<>(Person.class);
        List<Person> people = DataService.getPeople();
        grid.setItems(people);
        grid.removeAllColumns();
        grid.addColumn(
                TemplateRenderer.<Person>of("<img style=\"height: var(--lumo-size-m)\" src=\"[[item.pictureUrl]]\" alt=\"User avatar\" />")
                        .withProperty("pictureUrl", Person::getPictureUrl))
                .setHeader("Image")
                .setAutoWidth(true)
                .setFlexGrow(0);
        grid.addColumn("firstName");
        grid.addColumn("lastName");
        grid.addColumn("email");

        add(grid);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<GridColumnWidth> { // hidden-full-source-line
    } // hidden-full-source-line
}
