package com.vaadin.demo.component.menubar;

import com.vaadin.flow.component.ClickEvent;
import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.contextmenu.SubMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line


@Route("menu-bar-checkable")
public class MenuBarCheckable extends Div {
    public MenuBarCheckable() {
        // tag::snippet[]
        MenuBar menuBar = new MenuBar();
        MenuItem options = menuBar.addItem("Options");
        SubMenu subItems = options.getSubMenu();

        MenuItem saveItem = subItems.addItem("Save automatically");
        saveItem.setCheckable(true);
        saveItem.setChecked(true);
        MenuItem notifyItem = subItems.addItem("Notify watchers");
        notifyItem.setCheckable(true);
        notifyItem.setChecked(false);

        ComponentEventListener<ClickEvent<MenuItem>> listener = event -> {
            // System.out.println(event.getSource().isChecked());
        };

        saveItem.addClickListener(listener);
        notifyItem.addClickListener(listener);
        // end::snippet[]
        add(menuBar);
    }

    public static class Exporter extends DemoExporter<MenuBarCheckable> { // hidden-source-line
    } // hidden-source-line
}