package com.vaadin.demo.component.grid;

import java.util.List;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.data.renderer.LitRenderer;
import com.vaadin.flow.data.renderer.Renderer;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;

@Route("grid-column-freezing")
public class GridColumnFreezing extends Div {

    public GridColumnFreezing() {
        Grid<Person> grid = new Grid<>(Person.class, false);
        // tag::snippet[]
        grid.addColumn(createPersonRenderer()).setHeader("Name").setFrozen(true)
                .setAutoWidth(true).setFlexGrow(0);
        // end::snippet[]
        grid.addColumn(Person::getEmail).setHeader("Email").setAutoWidth(true);
        grid.addColumn(person -> person.getAddress().getPhone())
                .setHeader("Phone").setAutoWidth(true);
        grid.addColumn(Person::getProfession).setHeader("Profession")
                .setAutoWidth(true);
        grid.addColumn(person -> person.getAddress().getStreet())
                .setHeader("Street").setAutoWidth(true);

        List<Person> people = DataService.getPeople();
        grid.setItems(people);

        add(grid);
    }

    private static Renderer<Person> createPersonRenderer() {
        return LitRenderer.<Person>of(
                "<vaadin-horizontal-layout style=\"align-items: center;\" theme=\"spacing\">"
                        + "  <vaadin-avatar style=\"height: var(--lumo-size-m)\" img=\"${item.pictureUrl}\" name=\"${item.fullName}\" alt=\"User avatar\"></vaadin-avatar>"
                        + "  <span> ${item.fullName} </span>"
                        + "</vaadin-horizontal-layout>")
                .withProperty("pictureUrl", Person::getPictureUrl)
                .withProperty("fullName", Person::getFullName);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridColumnFreezing> { // hidden-source-line
    } // hidden-source-line
}
