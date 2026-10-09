package com.vaadin.demo.component.treegrid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.treegrid.TreeGrid;
import com.vaadin.flow.data.provider.hierarchy.HierarchicalDataProvider.HierarchyFormat;
import com.vaadin.flow.data.provider.hierarchy.TreeData;
import com.vaadin.flow.data.provider.hierarchy.TreeDataProvider;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("tree-grid-column")
public class TreeGridColumn extends Div {

    private List<Person> managers = DataService.getManagers();

    public TreeGridColumn() {
        TreeGrid<Person> treeGrid = new TreeGrid<>();
        TreeData<Person> treeData = new TreeData<>();
        treeData.addItems(managers, this::getStaff);
        treeGrid.setDataProvider(
                new TreeDataProvider<>(treeData, HierarchyFormat.FLATTENED));
        treeGrid.addHierarchyColumn(Person::getFirstName)
                .setHeader("First name");
        treeGrid.addColumn(Person::getLastName).setHeader("Last name");
        treeGrid.addColumn(Person::getEmail).setHeader("Email");

        H3 employees = new H3("Employees");

        // tag::snippet[]
        Button expand = new Button("Expand All");
        expand.addClickListener(event -> treeGrid.expand(managers));

        Button collapse = new Button("Collapse All");
        collapse.addClickListener(event -> treeGrid.collapse(managers));
        // end::snippet[]

        HorizontalLayout header = new HorizontalLayout(employees);
        header.addToEnd(expand, collapse);
        header.setAlignItems(FlexComponent.Alignment.CENTER);
        header.setHeight("3.5rem");

        add(header, treeGrid);
    }

    public List<Person> getStaff(Person manager) {
        return DataService.getPeople(manager.getId());
    }

    public static class Exporter extends DemoExporter<TreeGridColumn> { // hidden-source-line
    } // hidden-source-line
}
