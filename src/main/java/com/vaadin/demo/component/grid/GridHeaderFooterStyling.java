package com.vaadin.demo.component.grid;

import com.vaadin.demo.DemoExporter;
import com.vaadin.demo.domain.DataService;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.util.List;
import java.util.stream.Collectors;

@Route("grid-header-footer-styling")
public class GridHeaderFooterStyling extends Div {

    public GridHeaderFooterStyling() {
        List<PersonWithRating> people = createDataSet();
        double avgRating = people.stream()
                .mapToDouble(PersonWithRating::getRating).average().orElse(0.0);

        // tag::snippet[]
        Grid<PersonWithRating> grid = new Grid<>(PersonWithRating.class, false);
        grid.addClassName("styling-header-footer");
        grid.addColumn(PersonWithRating::getFirstName).setHeader("First name")
                .setHeaderPartName("header-bold");
        grid.addColumn(PersonWithRating::getLastName).setHeader("Last name")
                .setHeaderPartName("header-bold");
        grid.addColumn(PersonWithRating::getProfession).setHeader("Profession")
                .setHeaderPartName("header-bold");
        grid.addColumn(PersonWithRating::getFormattedRating)
                .setHeader("Customer rating (0-10)")
                .setHeaderPartName("header-bold")
                .setFooter(String.format("Avg rating: %.2f", avgRating))
                .setFooterPartName("footer-light-green");
        // end::snippet[]

        grid.setItems(people);

        add(grid);
    }

    private static List<PersonWithRating> createDataSet() {
        return DataService.getPeople().stream()
                .map(PersonWithRating::generateFromPerson)
                .collect(Collectors.toList());
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridHeaderFooterStyling> { // hidden-source-line
    } // hidden-source-line
}
