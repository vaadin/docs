package com.vaadin.demo.component.listbox;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.listbox.ListBox;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("list-box-basic")
public class ListBoxBasic extends Div {

    public ListBoxBasic() {
        // tag::snippet[]
        ListBox<String> listBox = new ListBox<>();
        listBox.setItems("Show assignee", "Show due date", "Show status");
        add(listBox);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<ListBoxBasic> { // hidden-source-line
    } // hidden-source-line
}
