package com.vaadin.demo.component.menubar;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.contextmenu.SubMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.router.Route;

@Route("menu-bar-custom-item-data")
public class MenuBarCustomItemData extends Div {

    public MenuBarCustomItemData() {
        // tag::snippet[]
        MenuBar menuBar = new MenuBar();
        MenuItem copy = menuBar.addItem("Copy");
        SubMenu copySubMenu = copy.getSubMenu();

        copySubMenu.addItem("Copy as plain text", event -> {
            // Provide a custom value by adding a click listener that holds a
            // reference to that value
            String value = "Menu Bar\n\nMenu Bar is a horizontal button bar with hierarchical drop-down menus.";
            copyToClipboard(value);
        });

        copySubMenu.addItem("Copy as HTML", event -> {
            String value = "<h1>Menu Bar</h1><p>Menu Bar is a horizontal button bar with hierarchical drop-down menus.</p>";
            copyToClipboard(value);
        });

        copySubMenu.addItem("Copy as Markdown", event -> {
            String value = "# Menu Bar\n\nMenu Bar is a horizontal button bar with hierarchical drop-down menus.";
            copyToClipboard(value);
        });
        // end::snippet[]

        add(menuBar);
    }

    private void copyToClipboard(String value) {
        getUI().ifPresent(ui -> ui.getPage()
                .executeJs("window.navigator.clipboard.writeText($0);", value));
    }

    public static class Exporter extends DemoExporter<MenuBarCustomItemData> { // hidden-source-line
    } // hidden-source-line
}
