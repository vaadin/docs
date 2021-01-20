package com.vaadin.demo.component.listbox;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.listbox.ListBox;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("list-box-separators")
public class ListBoxSeparators extends Div {

    public ListBoxSeparators() {
        // tag::snippet[]
        ListBox<String> listBox = new ListBox<>();
        listBox.setItems("Show assignee", "Show due date", "Show status");
        add(listBox);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<ListBoxSeparators> { // hidden-full-source-line
    } // hidden-full-source-line
}
