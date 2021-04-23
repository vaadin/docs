package com.vaadin.demo.component.treegrid;

import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.treegrid.TreeGrid;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("tree-grid-column")
public class TreeGridColumn extends Div {

    private List<Person> managers = DataService.getManagers();

    public TreeGridColumn() {
        TreeGrid<Person> treeGrid = new TreeGrid<>();
        treeGrid.setItems(managers, this::getStaff);
        treeGrid.addHierarchyColumn(Person::getFirstName).setHeader("First name");
        treeGrid.addColumn(Person::getLastName).setHeader("Last name");
        treeGrid.addColumn(Person::getEmail).setHeader("Email");

        H3 employees = new H3("Employees");
        employees.getStyle().set("margin", "0");

        // tag::snippet[]
        Button expand = new Button("Expand All");
        expand.addClickListener(event -> treeGrid.expand(managers));

        Button collapse = new Button("Collapse All");
        collapse.addClickListener(event -> treeGrid.collapse(managers));
        // end::snippet[]

        HorizontalLayout header = new HorizontalLayout(employees, expand, collapse);
        header.setAlignItems(FlexComponent.Alignment.CENTER);
        header.setHeight("var(--lumo-space-xl)");
        header.setFlexGrow(1, employees);

        add(header, treeGrid);
    }

    public List<Person> getStaff(Person manager) {
        return DataService.getPeople(manager.getManagerId());
    }
    public static class Exporter extends DemoExporter<TreeGridColumn> {} // hidden-full-source-line
}
