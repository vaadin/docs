package com.vaadin.demo.component.masterdetaillayout;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;

import java.util.List;

public class PersonList extends VerticalLayout {
    private final Grid<Person> grid;

    public PersonList(List<Person> people) {
        Paragraph paragraph = new Paragraph("Select a person to view their details:");
        grid = new Grid<>();
        grid.addColumn(Person::getFirstName).setHeader("First Name");
        grid.addColumn(Person::getLastName).setHeader("Last Name");
        grid.addColumn(Person::getEmail).setHeader("Email");
        grid.addColumn(Person::getProfession).setHeader("Profession");
        grid.setItems(people);
        grid.setHeightFull();

        add(paragraph, grid);
        setHeightFull();
    }

    public Grid<Person> getGrid() {
        return grid;
    }
}
