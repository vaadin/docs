package com.vaadin.demo.component.treegrid;

import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.treegrid.TreeGrid;
import com.vaadin.flow.router.Route;

import java.util.List;
import java.util.stream.Collectors;

import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("tree-grid-basic")
public class TreeGridBasic extends Div {

    private List<Person> people = DataService.getPeople();

    public TreeGridBasic() {
        // tag::snippet[]
        TreeGrid<Person> treeGrid = new TreeGrid<>();
        treeGrid.setItems(getManagers(), this::getStaff);
        treeGrid.addHierarchyColumn(Person::getFirstName).setHeader("First name");
        treeGrid.addColumn(Person::getLastName).setHeader("Last name");
        treeGrid.addColumn(Person::getEmail).setHeader("Email");
        // end::snippet[]
        add(treeGrid);
    }

    private List<Person> getManagers() {
        return people.stream().filter(person -> person.getManagerId() == null).collect(Collectors.toList());
    }

    public List<Person> getStaff(Person manager) {
        return people.stream().filter(person -> person.getManagerId() == manager.getId()).collect(Collectors.toList());
    }

    public static class Exporter extends DemoExporter<TreeGridBasic> { // hidden-full-source-line
    } // hidden-full-source-line
}
