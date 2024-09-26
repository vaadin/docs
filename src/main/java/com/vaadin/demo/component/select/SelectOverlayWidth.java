package com.vaadin.demo.component.select;

import java.util.List;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.router.Route;

@Route("select-overlay-width")
public class SelectOverlayWidth extends Div {

    public SelectOverlayWidth() {
        // tag::snippet[]
        Select<Person> select = new Select<>();
        select.setOverlayWidth("350px");
        // end::snippet[]

        List<Person> people = DataService.getPeople(5);
        select.setLabel("Employee");
        select.setItems(people);
        select.setItemLabelGenerator(person -> person.getProfession() + " - "
                + person.getFirstName() + " " + person.getLastName());
        add(select);
    }

    public static class Exporter extends DemoExporter<SelectOverlayWidth> { // hidden-source-line
    } // hidden-source-line
}
