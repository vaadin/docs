package com.vaadin.demo.component.treegrid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.dnd.GridDropMode;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.treegrid.TreeGrid;
import com.vaadin.flow.data.provider.hierarchy.TreeData;
import com.vaadin.flow.data.provider.hierarchy.TreeDataProvider;
import com.vaadin.flow.router.Route;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Route("tree-grid-drag-drop")
public class TreeGridDragDrop extends Div {

    private final List<Person> managers;
    private final Map<Integer, List<Person>> staffGroupedByMangers;

    private Person draggedItem;

    public TreeGridDragDrop() {
        List<Person> people = DataService.getPeople();
        managers = people.stream().filter(Person::isManager)
                .toList();
        staffGroupedByMangers = people.stream()
                .filter(person -> person.getManagerId() != null)
                .collect(Collectors.groupingBy(Person::getManagerId,
                        Collectors.toList()));

        // tag::snippet[]
        TreeGrid<Person> treeGrid = setupTreeGrid();

        TreeData<Person> treeData = new TreeData<>();
        treeData.addItems(managers, this::getStaff);

        // For drag-and-drop use cases, it is recommended to use data providers that
        // return hierarchical data in HierarchyFormat.FLATTENED. This format allows
        // TreeGrid to maintain the scroll position after refreshAll(), avoiding the
        // scroll jumps that can otherwise occur with HierarchyFormat.NESTED (default)
        // which requires each hierarchy level to be requested separately, on demand.
        TreeDataProvider<Person> treeDataProvider = new TreeDataProvider<>(
                treeData/* , HierarchyFormat.FLATTENED */);
        treeGrid.setDataProvider(treeDataProvider);

        // Enable drag-and-drop
        treeGrid.setRowsDraggable(true);
        // Only allow dragging staff
        treeGrid.setDragFilter(person -> !person.isManager());
        // Only allow dropping on managers
        treeGrid.setDropFilter(Person::isManager);

        treeGrid.addDragStartListener(e -> {
            treeGrid.setDropMode(GridDropMode.ON_TOP);
            draggedItem = e.getDraggedItems().get(0);
        });

        treeGrid.addDropListener(e -> {
            Person newManager = e.getDropTargetItem().orElse(null);
            boolean isSameManager = newManager != null
                    && newManager.getId().equals(draggedItem.getManagerId());

            if (newManager == null || isSameManager)
                return;

            draggedItem.setManagerId(newManager.getId());
            treeData.setParent(draggedItem, newManager);

            // Reset TreeGrid's cache to trigger a re-render
            treeDataProvider.refreshAll();
        });

        treeGrid.addDragEndListener(e -> {
            treeGrid.setDropMode(null);
            draggedItem = null;
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

    private List<Person> getStaff(Person manager) {
        return staffGroupedByMangers.getOrDefault(manager.getId(),
                Collections.emptyList());
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<TreeGridDragDrop> { // hidden-source-line
    } // hidden-source-line
}
