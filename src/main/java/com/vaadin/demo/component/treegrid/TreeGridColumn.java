package com.vaadin.demo.component.treegrid;

import com.vaadin.demo.DemoExporter;
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
import java.util.stream.Collectors;

@Route("tree-grid-column")
public class TreeGridColumn extends Div {

    private List<Person> people = DataService.getPeople();

    public TreeGridColumn() {
        TreeGrid<Person> treeGrid = new TreeGrid<>();
        treeGrid.setItems(getManagers(), this::getStaff);
        treeGrid.addHierarchyColumn(Person::getFirstName).setHeader("First name");
        treeGrid.addColumn(Person::getLastName).setHeader("Last name");
        treeGrid.addColumn(Person::getEmail).setHeader("Email");

        H3 employees = new H3("Employees");
        employees.getStyle().set("margin", "0");

        // tag::snippet[]
        Button expand = new Button("Expand All");
        expand.addClickListener(event -> treeGrid.expand(getManagers()));

        Button collapse = new Button("Collapse All");
        collapse.addClickListener(event -> treeGrid.collapse(getManagers()));
        // end::snippet[]

        HorizontalLayout header = new HorizontalLayout(employees, expand, collapse);
        header.setAlignItems(FlexComponent.Alignment.CENTER);
        header.setHeight("var(--lumo-space-xl)");
        header.setFlexGrow(1, employees);

        add(header, treeGrid);
    }

    private List<Person> getManagers() {
        return people.stream().filter(person -> person.getManagerId() == null).collect(Collectors.toList());
    }

    public List<Person> getStaff(Person manager) {
        return people.stream().filter(person -> person.getManagerId() == manager.getId()).collect(Collectors.toList());
    }

    public static class Exporter extends DemoExporter<TreeGridColumn> { // hidden-full-source-line
    } // hidden-full-source-line
}
