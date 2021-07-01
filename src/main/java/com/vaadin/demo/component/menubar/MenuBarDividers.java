package com.vaadin.demo.component.menubar;

import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.contextmenu.SubMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Hr;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("menu-bar-dividers")
public class MenuBarDividers extends Div {
    public MenuBarDividers() {
        // tag::snippet[]
        MenuBar menuBar = new MenuBar();
        MenuItem item = menuBar.addItem("Share");
        SubMenu subMenu = item.getSubMenu();
        subMenu.addItem("Facebook");
        subMenu.addItem("Twitter");
        subMenu.addItem("Instagram");
        subMenu.add(new Hr());
        subMenu.addItem("By email");
        subMenu.addItem("Get link");
        subMenu.add(new Hr());
        subMenu.addItem("Set permissions");
        // end::snippet[]

        add(menuBar);
    }
    public static class Exporter extends DemoExporter<MenuBarDividers> { // hidden-source-line
    } // hidden-source-line
}
