package com.vaadin.demo.component.contextmenu;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.contextmenu.ContextMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.router.Route;

@Route("context-menu-custom-item-data")
public class ContextMenuCustomItemData extends Div {

    public ContextMenuCustomItemData() {
        // tag::snippet[]
        Div wrapper = new Div(new H1("Context Menu"), new Paragraph(
                "Menu Bar is a horizontal button bar with hierarchical drop-down menus."));

        ContextMenu menu = new ContextMenu();
        menu.setTarget(wrapper);

        menu.addItem("Copy as plain text", event -> {
            // Provide a custom value by adding a click listener that holds a
            // reference to that value
            String value = "Menu Bar\n\nMenu Bar is a horizontal button bar with hierarchical drop-down menus.";
            copyToClipboard(value);
        });

        menu.addItem("Copy as HTML", event -> {
            String value = "<h1>Menu Bar</h1><p>Menu Bar is a horizontal button bar with hierarchical drop-down menus.</p>";
            copyToClipboard(value);
        });

        menu.addItem("Copy as Markdown", event -> {
            String value = "# Menu Bar\n\nMenu Bar is a horizontal button bar with hierarchical drop-down menus.";
            copyToClipboard(value);
        });
        // end::snippet[]

        add(wrapper);
    }

    private void copyToClipboard(String value) {
        getUI().ifPresent(ui -> ui.getPage()
                .executeJs("window.navigator.clipboard.writeText($0);", value));
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<ContextMenuCustomItemData> { // hidden-source-line
    } // hidden-source-line
}
