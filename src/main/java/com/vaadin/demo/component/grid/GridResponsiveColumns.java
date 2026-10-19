package com.vaadin.demo.component.grid;

import java.util.List;

import com.vaadin.demo.DemoExporter;
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.Size;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.splitlayout.SplitLayout;
import com.vaadin.flow.data.renderer.LitRenderer;
import com.vaadin.flow.signals.Signal;

public class GridResponsiveColumns extends Div {

    // tag::snippet[]
    private static final int BREAKPOINT_PX = 500;

    public GridResponsiveColumns() {
        Grid<Person> grid = new Grid<>(DataService.getPeople());

        // A single column that combines the content when the grid is narrow
        String template = "<b>${item.name}</b><br><small>${item.email}</small>";
        Grid.Column<Person> combinedColumn = grid
                .addColumn(LitRenderer.<Person> of(template)
                        .withProperty("name", Person::getFullName)
                        .withProperty("email", Person::getEmail))
                .setHeader("Employee");

        // Separate columns for when the grid is wide
        List<Grid.Column<Person>> wideColumns = List.of(
                grid.addColumn(Person::getFullName).setHeader("Name"),
                grid.addColumn(Person::getProfession).setHeader("Profession"),
                grid.addColumn(Person::getEmail).setHeader("Email"));

        // The effect runs when the grid is attached and again whenever the
        // grid is resized
        Signal<Size> size = grid.getElement().sizeSignal();
        Signal.effect(grid, () -> {
            int width = size.get().width();
            // The width is 0 until the browser has reported the size. Keep
            // all columns hidden until then.
            boolean sizeKnown = width > 0;
            boolean wide = width >= BREAKPOINT_PX;
            combinedColumn.setVisible(sizeKnown && !wide);
            wideColumns.forEach(column -> column.setVisible(sizeKnown && wide));
        });
        // end::snippet[]

        grid.setWidthFull();
        SplitLayout splitLayout = new SplitLayout(grid, new Div());
        add(splitLayout);
        // tag::snippet[]
    }
    // end::snippet[]

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridResponsiveColumns> { // hidden-source-line
    } // hidden-source-line
}
