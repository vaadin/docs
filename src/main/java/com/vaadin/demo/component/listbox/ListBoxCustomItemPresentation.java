package com.vaadin.demo.component.listbox;

import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.listbox.MultiSelectListBox;
import com.vaadin.flow.data.renderer.ComponentRenderer;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

import java.util.List;

@Route("list-box-custom-item-presentation")
public class ListBoxCustomItemPresentation extends Div {

    private List<Person> items = DataService.getPeople(5);

    public ListBoxCustomItemPresentation() {
        MultiSelectListBox<Person> listBox = new MultiSelectListBox<>();
        listBox.setItems(items);
        // tag::snippet[]
        listBox.setRenderer(new ComponentRenderer<>(person -> {
            Avatar avatar = new Avatar(person.getFullName(),
                    person.getPictureUrl());
            Span name = new Span(person.getFullName());
            Span profession = new Span(person.getProfession());

            Div personItem = new Div(avatar, name, profession);
            personItem.addClassName("person-item");
            return personItem;
        }));
        // end::snippet[]
        listBox.select(items.get(0), items.get(2));
        add(listBox);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<ListBoxCustomItemPresentation> { // hidden-source-line
    } // hidden-source-line
}
