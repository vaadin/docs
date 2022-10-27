package com.vaadin.demo.component.menubar;

import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.contextmenu.SubMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.component.menubar.MenuBarVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("menu-bar-right-aligned")
public class MenuBarRightAligned extends Div {

    public MenuBarRightAligned() {
        // tag::snippet[]
        MenuBar menuBar = new MenuBar();
        menuBar.addThemeVariants(MenuBarVariant.LUMO_END_ALIGNED);
        // end::snippet[]

        menuBar.addItem("View");
        menuBar.addItem("Edit");
        MenuItem share = menuBar.addItem("Share");
        SubMenu shareSubMenu = share.getSubMenu();
        shareSubMenu.addItem("By email");
        shareSubMenu.addItem("Get Link");

        add(menuBar);
    }

    public static class Exporter extends DemoExporter<MenuBarRightAligned> { // hidden-source-line
    } // hidden-source-line
}
