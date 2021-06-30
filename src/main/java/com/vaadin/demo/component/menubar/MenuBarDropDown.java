package com.vaadin.demo.component.menubar;

import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.contextmenu.SubMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Hr;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("menu-bar-dropdown")
public class MenuBarDropDown extends Div {
    public MenuBarDropDown() {
        // tag::snippet[]
        MenuBar menuBar = new MenuBar();
        MenuItem item = menuBar.addItem("John Smith");
        SubMenu subItems = item.getSubMenu();
        subItems.addItem("Profile");
        subItems.addItem("Account");
        subItems.addItem("Preferences");
        subItems.add(new Hr());
        subItems.addItem("Sign out");
        // end::snippet[]

        add(menuBar);
    }
    public static class Exporter extends DemoExporter<MenuBarDropDown> { // hidden-source-line
    } // hidden-source-line
}



