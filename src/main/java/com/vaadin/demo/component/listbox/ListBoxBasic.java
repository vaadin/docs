package com.vaadin.demo.component.listbox;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.listbox.MultiSelectListBox;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("list-box-basic")
public class ListBoxBasic extends Div {

    private final String SHOW_ASSIGNEE = "Show assignee";
    private final String SHOW_DUE_DATE = "Show due date";
    private final String SHOW_STATUS = "Show status";

    public ListBoxBasic() {
        // tag::snippet[]
        MultiSelectListBox<String> listBox = new MultiSelectListBox<>();
        listBox.setItems(SHOW_ASSIGNEE, SHOW_DUE_DATE, SHOW_STATUS);
        listBox.select(SHOW_ASSIGNEE, SHOW_STATUS);
        // end::snippet[]
        add(listBox);
    }

    public static class Exporter extends DemoExporter<ListBoxBasic> { // hidden-source-line
    } // hidden-source-line
}
