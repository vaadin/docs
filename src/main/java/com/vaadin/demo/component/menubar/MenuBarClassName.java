package com.vaadin.demo.component.menubar;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.contextmenu.SubMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.theme.lumo.LumoUtility;

@Route("menu-bar-class-name")
public class MenuBarClassName extends Div {

    public MenuBarClassName() {
        MenuBar menuBar = new MenuBar();

        // tag::snippet[]
        MenuItem view = menuBar.addItem("View");
        view.addClassNames("custom");

        MenuItem edit = menuBar.addItem("Edit");

        MenuItem share = menuBar.addItem("Share");
        SubMenu shareSubMenu = share.getSubMenu();

        shareSubMenu.addItem("By email").addClassNames("custom");
        shareSubMenu.addItem("Get Link");
        // end::snippet[]

        add(menuBar);
    }

    public static class Exporter extends DemoExporter<MenuBarClassName> { // hidden-source-line
    } // hidden-source-line
}
