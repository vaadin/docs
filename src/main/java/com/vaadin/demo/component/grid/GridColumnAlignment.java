package com.vaadin.demo.component.grid;

import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.ThreadLocalRandom;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.ColumnTextAlign;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.data.renderer.LocalDateRenderer;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;

@Route("grid-column-alignment")
public class GridColumnAlignment extends Div {

    public GridColumnAlignment() {
        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.addColumn(Person::getFullName).setHeader("Name");
        grid.addColumn(new LocalDateRenderer<>(
                GridColumnAlignment::generateRandomDueDate, "MM/dd/yyyy"))
                .setHeader("Due");
        // tag::snippet[]
        grid.addColumn(GridColumnAlignment::generateRandomAmountText)
                .setHeader("Amount").setTextAlign(ColumnTextAlign.END);
        // end::snippet[]

        List<Person> people = DataService.getPeople();
        grid.setItems(people);

        add(grid);
    }

    private static LocalDate generateRandomDueDate(Person person) {
        LocalDate rangeStart = LocalDate.now(ZoneId.systemDefault());
        LocalDate rangeEnd = rangeStart.plusYears(1);
        long randomEpochDay = ThreadLocalRandom.current()
                .nextLong(rangeStart.toEpochDay(), rangeEnd.toEpochDay());

        return LocalDate.ofEpochDay(randomEpochDay);
    }

    private static final NumberFormat currencyFormatter = NumberFormat
            .getCurrencyInstance(new Locale("en", "US"));

    private static String generateRandomAmountText(Person person) {
        double randomValue = ThreadLocalRandom.current()
                .nextDouble(10000, 1000000);

        return currencyFormatter.format(randomValue);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridColumnAlignment> { // hidden-source-line
    } // hidden-source-line
}
