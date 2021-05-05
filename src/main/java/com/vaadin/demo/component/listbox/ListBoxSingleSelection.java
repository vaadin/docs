package com.vaadin.demo.component.listbox;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.listbox.ListBox;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("list-box-single-selection")
public class ListBoxSingleSelection extends Div {

    private final String IN_PROGRESS = "In progress";
    private final String DONE = "Done";
    private final String CANCELLED = "Cancelled";

    public ListBoxSingleSelection() {
        // tag::snippet[]
        ListBox<String> listBox = new ListBox<>();
        listBox.setItems(IN_PROGRESS, DONE, CANCELLED);
        listBox.setValue(IN_PROGRESS);
        // end::snippet[]
        add(listBox);
    }

    public static class Exporter extends DemoExporter<ListBoxSingleSelection> { // hidden-source-line
    } // hidden-source-line
}
