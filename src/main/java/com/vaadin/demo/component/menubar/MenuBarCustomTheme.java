package com.vaadin.demo.component.menubar;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.contextmenu.SubMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.router.Route;

@Route("menu-bar-custom-theme")
public class MenuBarCustomTheme extends Div {

    public MenuBarCustomTheme() {
        MenuBar menuBar = new MenuBar();

        // tag::snippet[]
        MenuItem view = menuBar.addItem("View");
        view.addThemeNames("custom-theme");

        MenuItem edit = menuBar.addItem("Edit");

        MenuItem share = menuBar.addItem("Share");
        SubMenu shareSubMenu = share.getSubMenu();
        shareSubMenu.addItem("By email").addThemeNames("custom-theme");
        shareSubMenu.addItem("Get Link");
        // end::snippet[]

        add(menuBar);
    }

    public static class Exporter extends DemoExporter<MenuBarCustomTheme> { // hidden-source-line
    } // hidden-source-line
}
