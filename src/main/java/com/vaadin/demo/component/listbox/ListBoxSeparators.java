package com.vaadin.demo.component.listbox;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Hr;
import com.vaadin.flow.component.listbox.MultiSelectListBox;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("list-box-separators")
public class ListBoxSeparators extends Div {

    private final String SHOW_ASSIGNEE = "Show assignee";
    private final String SHOW_DUE_DATE = "Show due date";
    private final String SHOW_STATUS = "Show status";
    private final String SHOW_THUMBNAIL = "Show thumbnail";
    private final String SHOW_PREVIEW = "Show preview";

    public ListBoxSeparators() {
        MultiSelectListBox<String> listBox = new MultiSelectListBox<>();
        // tag::snippet[]
        listBox.setItems(
            SHOW_ASSIGNEE, SHOW_DUE_DATE, SHOW_STATUS, SHOW_THUMBNAIL, SHOW_PREVIEW
        );
        listBox.addComponents(SHOW_STATUS, new Hr());
        // end::snippet[]
        listBox.select(SHOW_ASSIGNEE, SHOW_STATUS, SHOW_THUMBNAIL);
        add(listBox);
    }

    public static class Exporter extends DemoExporter<ListBoxSeparators> { // hidden-source-line
    } // hidden-source-line
}
