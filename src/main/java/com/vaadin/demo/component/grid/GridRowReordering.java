package com.vaadin.demo.component.grid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.dataview.GridListDataView;
import com.vaadin.flow.component.grid.dnd.GridDropLocation;
import com.vaadin.flow.component.grid.dnd.GridDropMode;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.data.renderer.TemplateRenderer;
import com.vaadin.flow.router.Route;

import java.util.ArrayList;
import java.util.List;

@Route("grid-row-reordering")
public class GridRowReordering extends Div {

    private Person draggedPerson;

    public GridRowReordering() {
        // tag::snippet[]
        Grid<Person> grid = setupGrid();

        // Modifying the data view requires a mutable collection
        List<Person> people = new ArrayList<>(DataService.getPeople());
        GridListDataView<Person> dataView = grid.setItems(people);

        grid.setDropMode(GridDropMode.BETWEEN);
        grid.setRowsDraggable(true);

        grid.addDragStartListener(
                e -> draggedPerson = e.getDraggedItems().get(0));

        grid.addDropListener(e -> {
            Person targetPerson = e.getDropTargetItem().orElse(null);
            GridDropLocation dropLocation = e.getDropLocation();

            boolean personWasDroppedOntoItself = draggedPerson
                    .equals(targetPerson);

            if (targetPerson == null || personWasDroppedOntoItself)
                return;

            dataView.removeItem(draggedPerson);

            if (dropLocation == GridDropLocation.BELOW) {
                dataView.addItemAfter(draggedPerson, targetPerson);
            } else {
                dataView.addItemBefore(draggedPerson, targetPerson);
            }
        });

        grid.addDragEndListener(e -> draggedPerson = null);
        // end::snippet[]

        add(grid);
    }

    private static Grid<Person> setupGrid() {
        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.addColumn(createAvatarRenderer()).setHeader("Image")
                .setAutoWidth(true).setFlexGrow(0);
        grid.addColumn(Person::getFirstName).setHeader("First name");
        grid.addColumn(Person::getLastName).setHeader("Last name");
        grid.addColumn(Person::getEmail).setHeader("Email");

        return grid;
    }

    private static TemplateRenderer<Person> createAvatarRenderer() {
        return TemplateRenderer.<Person>of(
                "<vaadin-avatar img=\"[[item.pictureUrl]]\" name=\"[[item.fullName]]\" alt=\"User avatar\"></vaadin-avatar>")
                .withProperty("pictureUrl", Person::getPictureUrl);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridRowReordering> { // hidden-source-line
    } // hidden-source-line
}
