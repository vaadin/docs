package com.vaadin.demo.component.listbox;

import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.listbox.MultiSelectListBox;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
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
            HorizontalLayout row = new HorizontalLayout();
            row.setAlignItems(FlexComponent.Alignment.CENTER);

            Avatar avatar = new Avatar();
            avatar.setName(person.getFullName());
            avatar.setImage(person.getPictureUrl());

            Span name = new Span(person.getFullName());
            Span profession = new Span(person.getProfession());
            profession.getStyle()
                .set("color", "var(--lumo-secondary-text-color)")
                .set("font-size", "var(--lumo-font-size-s)");

            VerticalLayout column = new VerticalLayout(name, profession);
            column.setPadding(false);
            column.setSpacing(false);

            row.add(avatar, column);
            row.getStyle().set("line-height", "var(--lumo-line-height-m)");
            return row;
        }));
        // end::snippet[]
        listBox.select(items.get(0), items.get(2));
        add(listBox);
    }

    public static class Exporter extends DemoExporter<ListBoxCustomItemPresentation> { // hidden-source-line
    } // hidden-source-line
}
