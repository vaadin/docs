package com.vaadin.demo.component.menubar;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.contextmenu.SubMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.theme.lumo.LumoUtility;

@Route("menu-bar-custom-styling")
public class MenuBarCustomStyling extends Div {

    public MenuBarCustomStyling() {
        MenuBar menuBar = new MenuBar();

        // tag::snippet[]
        MenuItem view = menuBar.addItem("View");
        view.addClassNames(LumoUtility.Background.PRIMARY,
                LumoUtility.TextColor.PRIMARY_CONTRAST);
        ;

        MenuItem edit = menuBar.addItem("Edit");

        MenuItem share = menuBar.addItem("Share");
        SubMenu shareSubMenu = share.getSubMenu();

        shareSubMenu.addItem("By email").addClassNames(
                LumoUtility.Background.PRIMARY,
                LumoUtility.TextColor.PRIMARY_CONTRAST);
        shareSubMenu.addItem("Get Link");
        // end::snippet[]

        add(menuBar);
    }

    public static class Exporter extends DemoExporter<MenuBarCustomStyling> { // hidden-source-line
    } // hidden-source-line
}
