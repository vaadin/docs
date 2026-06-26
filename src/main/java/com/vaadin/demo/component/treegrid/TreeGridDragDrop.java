package com.vaadin.demo.component.treegrid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.dnd.GridDropMode;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.treegrid.TreeGrid;
import com.vaadin.flow.data.provider.hierarchy.TreeData;
import com.vaadin.flow.data.provider.hierarchy.TreeDataProvider;
import com.vaadin.flow.data.provider.hierarchy.HierarchicalDataProvider.HierarchyFormat;
import com.vaadin.flow.router.Route;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Route("tree-grid-drag-drop")
public class TreeGridDragDrop extends Div {

    private final List<Person> people = DataService.getPeople();
    private final List<Person> managers = people.stream()
            .filter(Person::isManager).toList();
    private final Map<Integer, List<Person>> staffByManagerId = people.stream()
            .filter(person -> person.getManagerId() != null)
            .collect(Collectors.groupingBy(Person::getManagerId));

    private Person draggedItem;

    public TreeGridDragDrop() {
        // tag::snippet[]
        TreeGrid<Person> treeGrid = setupTreeGrid();
        TreeData<Person> treeData = new TreeData<>();
        treeData.addItems(managers, this::getStaffByManager);

        // To preserve scroll position after refreshAll(), configure
        // TreeDataProvider to return data in the flattened hierarchy format.
        // More details can be found in the JavaDoc of the HierarchyFormat enum.
        TreeDataProvider<Person> treeDataProvider = new TreeDataProvider<>(
                treeData, HierarchyFormat.FLATTENED);
        treeGrid.setDataProvider(treeDataProvider);

        // Enable drag and drop
        treeGrid.setRowsDraggable(true);

        // Set a filter to allow dragging staff only
        treeGrid.setDragFilter(person -> !person.isManager());

        treeGrid.addDragStartListener(e -> {
            draggedItem = e.getDraggedItems().get(0);

            // Allow dropping on top of rows only
            treeGrid.setDropMode(GridDropMode.ON_TOP);

            // Set a filter to define valid drop targets
            // @formatter:off hidden-source-line
            treeGrid.setDropFilter(person ->
                    // Allow dropping on supervisors only
                    person.isManager() &&
                    // Disallow dropping on the same manager
                    !person.getId().equals(draggedItem.getManagerId()));
                    // @formatter:on hidden-source-line
        });

        treeGrid.addDropListener(e -> {
            Person newManager = e.getDropTargetItem().orElse(null);
            if (newManager == null) {
                return;
            }

            draggedItem.setManagerId(newManager.getId());
            treeData.setParent(draggedItem, newManager);

            // Reset TreeGrid's cache to reflect the hierarchy changes in the UI
            treeDataProvider.refreshAll();
        });

        treeGrid.addDragEndListener(e -> {
            draggedItem = null;

            treeGrid.setDropMode(null);
            treeGrid.setDropFilter(null);
        });
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

    private List<Person> getStaffByManager(Person manager) {
        return staffByManagerId.getOrDefault(manager.getId(),
                Collections.emptyList());
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<TreeGridDragDrop> { // hidden-source-line
    } // hidden-source-line
}
