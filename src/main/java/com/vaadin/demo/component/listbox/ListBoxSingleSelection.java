package com.vaadin.demo.component.listbox;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.listbox.ListBox;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("list-box-single-selection")
public class ListBoxSingleSelection extends Div {

    public ListBoxSingleSelection() {
        // tag::snippet[]
        ListBox<String> listBox = new ListBox<>();
        listBox.setItems("Show assignee", "Show due date", "Show status");
        add(listBox);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<ListBoxSingleSelection> { // hidden-full-source-line
    } // hidden-full-source-line
}
