package com.vaadin.demo.component.grid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.util.List;
import java.util.stream.Collectors;

@Route("grid-styling")
public class GridStyling extends Div {

    public GridStyling() {
        // tag::snippet[]
        Grid<PersonWithRating> grid = new Grid<>(PersonWithRating.class, false);
        grid.addColumn(PersonWithRating::getFirstName).setHeader("First name");
        grid.addColumn(PersonWithRating::getLastName).setHeader("Last name");
        grid.addColumn(PersonWithRating::getProfession).setHeader("Profession");
        grid.addColumn(PersonWithRating::getFormattedRating)
                .setHeader("Customer rating (0-10)");

        grid.setClassNameGenerator(person -> {
            if (person.getRating() >= 8)
                return "high-rating";
            if (person.getRating() <= 4)
                return "low-rating";
            return null;
        });
        // end::snippet[]

        List<PersonWithRating> people = createDataSet();
        grid.setItems(people);

        add(grid);
    }

    private static List<PersonWithRating> createDataSet() {
        return DataService.getPeople().stream()
                .map(PersonWithRating::generateFromPerson)
                .collect(Collectors.toList());
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridStyling> { // hidden-source-line
    } // hidden-source-line
}
