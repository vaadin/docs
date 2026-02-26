package com.vaadin.demo.component.select;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.data.renderer.ComponentRenderer;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("select-presentation")
public class SelectPresentation extends Div {

    private List<Person> items = DataService.getPeople(5);

    public SelectPresentation() {
        // tag::snippet[]
        Select<Person> select = new Select<>();
        select.setLabel("Choose doctor");
        select.setRenderer(new ComponentRenderer<>(person -> {
            Avatar avatar = new Avatar(person.getFullName(), person.getPictureUrl());
            Span name = new Span(person.getFullName());
            Span profession = new Span(person.getProfession());

            Div personItem = new Div(avatar, name, profession);
            personItem.addClassName("person-item");
            return personItem;
        }));
        select.setItems(items);
        add(select);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<SelectPresentation> { // hidden-source-line
    } // hidden-source-line
}
