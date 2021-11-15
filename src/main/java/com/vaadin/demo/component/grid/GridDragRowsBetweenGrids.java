package com.vaadin.demo.component.grid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.dnd.GridDragEndEvent;
import com.vaadin.flow.component.grid.dnd.GridDragStartEvent;
import com.vaadin.flow.component.grid.dnd.GridDropMode;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.data.provider.ListDataProvider;
import com.vaadin.flow.router.Route;

import java.util.ArrayList;
import java.util.List;

@Route("grid-drag-rows-between-grids")
public class GridDragRowsBetweenGrids extends Div {

    private Person draggedItem;

    public GridDragRowsBetweenGrids() {
        List<Person> people = DataService.getPeople(10);
        ArrayList<Person> people1 = new ArrayList<>(people.subList(0, 5));
        ArrayList<Person> people2 = new ArrayList<>(people.subList(5, 10));

        // tag::snippet[]
        Grid<Person> grid1 = setupGrid();
        Grid<Person> grid2 = setupGrid();

        ListDataProvider<Person> dataProvider1 = new ListDataProvider<>(people1);
        ListDataProvider<Person> dataProvider2 = new ListDataProvider<>(people2);

        grid1.setDataProvider(dataProvider1);
        grid2.setDataProvider(dataProvider2);

        grid1.setDropMode(GridDropMode.ON_GRID);
        grid1.setRowsDraggable(true);
        grid1.addDragStartListener(this::handleDragStart);
        grid1.addDropListener(e -> {
            if (dataProvider1.getItems().contains(draggedItem)) {
                return;
            }
            dataProvider2.getItems().remove(draggedItem);
            dataProvider2.refreshAll();
            dataProvider1.getItems().add(draggedItem);
            dataProvider1.refreshAll();
        });
        grid1.addDragEndListener(this::handleDragEnd);

        grid2.setDropMode(GridDropMode.ON_GRID);
        grid2.setRowsDraggable(true);
        grid2.addDragStartListener(this::handleDragStart);
        grid2.addDropListener(e -> {
            if (dataProvider2.getItems().contains(draggedItem)) {
                return;
            }
            dataProvider1.getItems().remove(draggedItem);
            dataProvider1.refreshAll();
            dataProvider2.getItems().add(draggedItem);
            dataProvider2.refreshAll();
        });
        grid2.addDragEndListener(this::handleDragEnd);
        // end::snippet[]

        Div container = new Div(grid1, grid2);
        setContainerStyles(container);

        add(container);
    }

    private static Grid<Person> setupGrid() {
        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.addColumn(Person::getFullName).setHeader("Full name");
        grid.addColumn(Person::getProfession).setHeader("Profession");
        setGridStyles(grid);

        return grid;
    }

    private void handleDragStart(GridDragStartEvent<Person> e) {
        draggedItem = e.getDraggedItems().get(0);
    }

    private void handleDragEnd(GridDragEndEvent<Person> e) {
        draggedItem = null;
    }

    private static void setGridStyles(Grid<Person> grid) {
        grid.getStyle().set("width", "300px").set("height", "300px")
                .set("margin-left", "0.5rem").set("margin-top", "0.5rem")
                .set("align-self", "unset");
    }

    private static void setContainerStyles(Div container) {
        container.getStyle().set("display", "flex").set("flex-direction", "row")
                .set("flex-wrap", "wrap");
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<GridDragRowsBetweenGrids> { // hidden-source-line
    } // hidden-source-line
}
