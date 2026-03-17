package com.vaadin.demo.component.select;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.data.renderer.ComponentRenderer;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("select-custom-renderer-label")
public class SelectCustomRendererLabel extends Div {

    public SelectCustomRendererLabel() {
        // tag::snippet[]
        Select<Person> select = new Select<>();
        select.setLabel("Assignee");
        // Use a custom renderer for items in the dropdown
        select.setRenderer(SelectCustomRendererLabel.createPersonRenderer());
        // Display full name of the person as selected value label
        select.setItemLabelGenerator(Person::getFullName);

        List<Person> people = DataService.getPeople(5);
        select.setItems(people);
        // end::snippet[]

        add(select);
    }

    private static ComponentRenderer<Div, Person> createPersonRenderer() {
        return new ComponentRenderer<>(person -> {
            Image image = new Image();
            image.setSrc(person.getPictureUrl());
            image.setAlt("Portrait of " + person.getFirstName() + " "
                    + person.getLastName());
            image.setWidth("2.25rem");

            Span name = new Span(person.getFullName());
            Span profession = new Span(person.getProfession());

            Div personItem = new Div(image, name, profession);
            personItem.addClassName("person-item");
            return personItem;
        });
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<SelectCustomRendererLabel> { // hidden-source-line
    } // hidden-source-line
}
