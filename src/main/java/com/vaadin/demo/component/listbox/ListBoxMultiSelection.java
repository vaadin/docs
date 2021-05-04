package com.vaadin.demo.component.listbox;

import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.listbox.MultiSelectListBox;
import com.vaadin.flow.data.renderer.ComponentRenderer;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

import java.util.List;

@Route("list-box-multi-selection")
public class ListBoxMultiSelection extends Div {

    private List<Person> items = DataService.getPeople(20);

    public ListBoxMultiSelection() {
        // tag::snippet[]
        MultiSelectListBox<Person> listBox = new MultiSelectListBox<>();
        listBox.setItems(items);
        listBox.select(items.get(0), items.get(3));
        // end::snippet[]
        listBox.setRenderer(new ComponentRenderer<>(person ->
            new Text(person.getFullName()))
        );
        listBox.setHeight("200px");
        add(listBox);
    }

    public static class Exporter extends DemoExporter<ListBoxMultiSelection> { // hidden-source-line
    } // hidden-source-line
}
