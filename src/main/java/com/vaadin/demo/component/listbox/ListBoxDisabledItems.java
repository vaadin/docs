package com.vaadin.demo.component.listbox;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.listbox.ListBox;
import com.vaadin.flow.data.renderer.ComponentRenderer;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("list-box-disabled-items")
public class ListBoxDisabledItems extends Div {

    private class Status {

        private String name;
        private int count;

        Status(String name, int count) {
            this.name = name;
            this.count = count;
        }

        public String getDisplayName() {
            return this.name + " (" + this.count + ")";
        }

        public String getName() {
            return name;
        }

        public int getCount() {
            return count;
        }
    }

    private Status inProgress = new Status("In progress", 2);
    private Status done = new Status("Done", 4);
    private Status cancelled = new Status("Cancelled", 0);

    public ListBoxDisabledItems() {
        // tag::snippet[]
        ListBox<Status> listBox = new ListBox<>();
        listBox.setItems(inProgress, done, cancelled);
        listBox.setItemEnabledProvider(status -> status.getCount() > 0);
        // end::snippet[]
        listBox.setRenderer(new ComponentRenderer<>(status ->
            new Text(status.getDisplayName()))
        );
        listBox.setValue(inProgress);
        add(listBox);
    }

    public static class Exporter extends DemoExporter<ListBoxDisabledItems> { // hidden-source-line
    } // hidden-source-line
}
