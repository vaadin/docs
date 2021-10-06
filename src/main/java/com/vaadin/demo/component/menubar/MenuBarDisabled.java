package com.vaadin.demo.component.menubar;

import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.contextmenu.SubMenu;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("menu-bar-disabled")
public class MenuBarDisabled extends Div {
    public MenuBarDisabled() {
        // tag::snippet[]
        MenuBar menuBar = new MenuBar();

        menuBar.addItem("View");
        MenuItem edit = menuBar.addItem("Edit");
        edit.getElement().setAttribute("disabled", true);

        MenuItem share = menuBar.addItem("Share");
        SubMenu shareSubMenu = share.getSubMenu();
        shareSubMenu.addItem("By email")
                .getElement()
                .setAttribute("disabled", true);
        shareSubMenu.addItem("Get Link");
        // end::snippet[]

        add(menuBar);
    }

    public static class Exporter extends DemoExporter<MenuBarDisabled> { // hidden-source-line
    } // hidden-source-line
}
