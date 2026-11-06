package com.vaadin.demo.component.treegrid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.treegrid.TreeGrid;
import com.vaadin.flow.data.provider.hierarchy.HierarchicalDataProvider.HierarchyFormat;
import com.vaadin.flow.data.provider.hierarchy.TreeData;
import com.vaadin.flow.data.provider.hierarchy.TreeDataProvider;
import com.vaadin.flow.router.Route;

@Route("tree-grid-subtree-highlight")
public class TreeGridSubtreeHighlight extends Div {

    private final TreeGrid<Person> treeGrid = new TreeGrid<>();
    private final TreeData<Person> treeData = new TreeData<>();

    public TreeGridSubtreeHighlight() {
        treeData.addItems(DataService.getManagers(),
                manager -> DataService.getPeople(manager.getId()));
        treeGrid.setDataProvider(
                new TreeDataProvider<>(treeData, HierarchyFormat.FLATTENED));
        treeGrid.addHierarchyColumn(Person::getFullName).setHeader("Full name");
        treeGrid.addColumn(Person::getProfession).setHeader("Profession");

        // tag::snippet[]
        treeGrid.setPartNameGenerator(person -> {
            Person selected = treeGrid.asSingleSelect().getValue();
            return isDescendantOf(person, selected) ? "selected-subtree" : null;
        });

        treeGrid.asSingleSelect().addValueChangeListener(event -> {
            // Regenerate the part names of the previous and new subtree
            refreshDescendants(event.getOldValue());
            refreshDescendants(event.getValue());
        });
        // end::snippet[]

        treeGrid.expand(DataService.getManagers().get(0));
        add(treeGrid);
    }

    // tag::snippet[]
    private boolean isDescendantOf(Person person, Person ancestor) {
        if (ancestor == null) {
            return false;
        }
        Person parent = treeData.getParent(person);
        while (parent != null) {
            if (parent.equals(ancestor)) {
                return true;
            }
            parent = treeData.getParent(parent);
        }
        return false;
    }

    private void refreshDescendants(Person person) {
        if (person == null) {
            return;
        }
        for (Person child : treeData.getChildren(person)) {
            treeGrid.getDataProvider().refreshItem(child);
            refreshDescendants(child);
        }
    }
    // end::snippet[]

    public static class Exporter // hidden-source-line
            extends DemoExporter<TreeGridSubtreeHighlight> { // hidden-source-line
    } // hidden-source-line
}
