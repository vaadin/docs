package com.vaadin.demo.component.treegrid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid.SelectionMode;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.treegrid.TreeGrid;
import com.vaadin.flow.data.provider.hierarchy.HierarchicalDataProvider.HierarchyFormat;
import com.vaadin.flow.data.provider.hierarchy.HierarchicalQuery;
import com.vaadin.flow.data.provider.hierarchy.TreeData;
import com.vaadin.flow.data.provider.hierarchy.TreeDataProvider;
import com.vaadin.flow.router.Route;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Route("tree-grid-recursive-selection")
public class TreeGridRecursiveSelection extends Div {

    private final TreeGrid<Person> treeGrid = new TreeGrid<>();

    public TreeGridRecursiveSelection() {
        TreeData<Person> treeData = new TreeData<>();
        treeData.addItems(DataService.getManagers(),
                manager -> DataService.getPeople(manager.getId()));

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

    private Set<Person> withDescendants(Collection<Person> items) {
        Set<Person> result = new HashSet<>();
        for (Person item : items) {
            result.add(item);
            if (treeGrid.getDataProvider().hasChildren(item)) {
                // HierarchicalQuery takes a filter and a parent. The filter is
                // null because Tree Grid has no filter of its own, and the
                // parent is the item whose direct children to fetch.
                List<Person> children = treeGrid.getDataProvider()
                        .fetchChildren(new HierarchicalQuery<>(null, item))
                        .toList();
                result.addAll(withDescendants(children));
            }
        }
        return result;
    }
    // end::snippet[]

    public static class Exporter // hidden-source-line
            extends DemoExporter<TreeGridRecursiveSelection> { // hidden-source-line
    } // hidden-source-line
}
