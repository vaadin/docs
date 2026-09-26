package com.vaadin.demo.component.treegrid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid.SelectionMode;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.treegrid.TreeGrid;
import com.vaadin.flow.data.provider.hierarchy.HierarchicalDataProvider.HierarchyFormat;
import com.vaadin.flow.data.provider.hierarchy.TreeData;
import com.vaadin.flow.data.provider.hierarchy.TreeDataProvider;
import com.vaadin.flow.router.Route;

import java.util.HashSet;
import java.util.Set;

@Route("tree-grid-recursive-selection")
public class TreeGridRecursiveSelection extends Div {

    private final TreeData<Person> treeData = new TreeData<>();

    public TreeGridRecursiveSelection() {
        treeData.addItems(DataService.getManagers(),
                manager -> DataService.getPeople(manager.getId()));

        TreeGrid<Person> treeGrid = new TreeGrid<>();
        treeGrid.setDataProvider(
                new TreeDataProvider<>(treeData, HierarchyFormat.FLATTENED));
        treeGrid.addHierarchyColumn(Person::getFullName).setHeader("Full name");
        treeGrid.addColumn(Person::getEmail).setHeader("Email");

        // tag::snippet[]
        treeGrid.setSelectionMode(SelectionMode.MULTI);
        treeGrid.asMultiSelect().addSelectionListener(event -> {
            // Ignore the programmatic selection changes made below
            if (!event.isFromClient()) {
                return;
            }
            treeGrid.asMultiSelect().updateSelection(
                    withDescendants(event.getAddedSelection()),
                    withDescendants(event.getRemovedSelection()));
        });
        // end::snippet[]

        add(treeGrid);
    }

    // tag::snippet[]

    private Set<Person> withDescendants(Set<Person> items) {
        Set<Person> result = new HashSet<>();
        for (Person item : items) {
            result.add(item);
            result.addAll(withDescendants(
                    new HashSet<>(treeData.getChildren(item))));
        }
        return result;
    }
    // end::snippet[]

    public static class Exporter // hidden-source-line
            extends DemoExporter<TreeGridRecursiveSelection> { // hidden-source-line
    } // hidden-source-line
}
