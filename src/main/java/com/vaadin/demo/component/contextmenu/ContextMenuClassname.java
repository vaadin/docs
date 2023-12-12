package com.vaadin.demo.component.contextmenu;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.contextmenu.ContextMenu;
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.router.Route;

import java.util.Arrays;
import java.util.List;

@Route("context-menu-classname")
public class ContextMenuClassname extends Div {

    private final ContextMenu menu;
    private final Span statusText;

    public ContextMenuClassname() {
        statusText = new Span();
        menu = new ContextMenu();

        // tag::snippet[]
        List<Status> statuses = Arrays.asList(
            new Status("Success", "text-success"),
            new Status("Warning", "text-warning"),
            new Status("Error", "text-error")
        );
        for (Status status : statuses) {
            MenuItem menuItem = menu.addItem(status.getName(), event -> {
                setStatus(status);
            });
            menuItem.setCheckable(true);
            menuItem.setClassName(status.getClassName());
        }
        // end::snippet[]

        Div statusInfo = new Div(new Span("Status: "), statusText);
        statusText.getStyle().set("font-weight", "bold");
        menu.setTarget(statusInfo);

        add(statusInfo);
    }

    private void setStatus(Status status) {
        // Update checked state of menu items
        menu.getItems().forEach(item -> item
                .setChecked(item.getText().equals(status.getName())));

        statusText.setText(status.getName());
        statusText.setClassName(status.getClassName());
    }

    public static class Status {
        private String name;
        private String className;

        public Status(String name, String className) {
            setName(name);
            setClassName(className);
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getClassName() {
            return className;
        }

        public void setClassName(String className) {
            this.className = className;
        }
    }

    public static class Exporter extends DemoExporter<ContextMenuClassname> { // hidden-source-line
    } // hidden-source-line
}
