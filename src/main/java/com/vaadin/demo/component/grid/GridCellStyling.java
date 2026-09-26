package com.vaadin.demo.component.grid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.data.renderer.LitRenderer;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("grid-cell-styling")
public class GridCellStyling extends Div {

    public GridCellStyling() {
        Grid<PersonWithRating> grid = new Grid<>(PersonWithRating.class, false);
        grid.addClassName("cell-styling");
        grid.addColumn(PersonWithRating::getFirstName).setHeader("First name");
        grid.addColumn(PersonWithRating::getLastName).setHeader("Last name");
        // tag::snippet[]
        // Style the whole cell based on its value
        grid.addColumn(PersonWithRating::getFormattedRating)
                .setHeader("Customer rating (0-10)")
                .setPartNameGenerator(person -> {
                    if (person.getRating() >= 8)
                        return "high-rating-cell";
                    if (person.getRating() <= 4)
                        return "low-rating-cell";
                    return null;
                });

        // Style only part of the cell content
        grid.addColumn(LitRenderer.<PersonWithRating> of("""
                <span class="rating-badge ${item.level}">${item.level}</span>
                """).withProperty("level",
                person -> person.getRating() >= 8 ? "high"
                        : person.getRating() <= 4 ? "low" : "medium"))
                .setHeader("Level");
        // end::snippet[]

        List<PersonWithRating> people = createDataSet();
        grid.setItems(people);

        add(grid);
    }

    private static List<PersonWithRating> createDataSet() {
        return DataService.getPeople().stream()
                .map(PersonWithRating::generateFromPerson).toList();
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridCellStyling> { // hidden-source-line
    } // hidden-source-line
}
