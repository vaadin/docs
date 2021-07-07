package com.vaadin.demo.component.grid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.dnd.GridDropMode;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.treegrid.TreeGrid;
import com.vaadin.flow.data.provider.hierarchy.TreeData;
import com.vaadin.flow.data.provider.hierarchy.TreeDataProvider;
import com.vaadin.flow.router.Route;

import java.util.List;
import java.util.stream.Collectors;

@Route("grid-drag-drop-filters")
public class GridDragDropFilters extends Div {

    private List<Person> people;
    private List<Person> managers;

    private Person draggedPerson;

    public GridDragDropFilters() {

        people = DataService.getPeople();
        managers = people.stream().filter(Person::isManager)
                .collect(Collectors.toList());

        // tag::snippet[]
        TreeGrid<Person> treeGrid = setupTreeGrid();

        TreeData<Person> treeData = new TreeData<>();
        treeData.addItems(managers, this::getStaff);
        TreeDataProvider<Person> treeDataProvider = new TreeDataProvider<>(
                treeData);
        treeGrid.setDataProvider(treeDataProvider);

        treeGrid.setRowsDraggable(true);
        treeGrid.setDropMode(GridDropMode.ON_TOP);
        // Only allow dragging staff
        treeGrid.setDragFilter(person -> !person.isManager());
        // Only allow dropping on managers
        treeGrid.setDropFilter(person -> person.isManager());

        treeGrid.addDragStartListener(
                e -> draggedPerson = e.getDraggedItems().get(0));

        treeGrid.addDropListener(e -> {
            Person newManager = e.getDropTargetItem().orElse(null);
            boolean isSameManager = newManager != null && newManager.getId()
                    .equals(draggedPerson.getManagerId());

            if (newManager == null || isSameManager)
                return;

            draggedPerson.setManagerId(newManager.getId());
            treeData.removeItem(draggedPerson);
            treeData.addItem(newManager, draggedPerson);

            treeDataProvider.refreshAll();
        });

        treeGrid.addDragEndListener(e -> draggedPerson = null);
        // end::snippet[]

        add(treeGrid);
    }

    private static TreeGrid<Person> setupTreeGrid() {
        TreeGrid<Person> treeGrid = new TreeGrid<>();
        treeGrid.addHierarchyColumn(Person::getFirstName)
                .setHeader("First name");
        treeGrid.addColumn(Person::getLastName).setHeader("Last name");
        treeGrid.addColumn(Person::getEmail).setHeader("Email");

        return treeGrid;
    }

    private List<Person> getStaff(Person manager) {
        return people.stream()
                .filter(p -> manager.getId().equals(p.getManagerId()))
                .collect(Collectors.toList());
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridDragDropFilters> { // hidden-source-line
    } // hidden-source-line
}
