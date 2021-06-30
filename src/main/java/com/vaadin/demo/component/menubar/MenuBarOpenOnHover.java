package com.vaadin.demo.component.menubar;

import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.contextmenu.SubMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("menu-bar-open-on-hover")
public class MenuBarOpenOnHover extends Div {
    public MenuBarOpenOnHover() {
        // tag::snippet[]
        MenuBar menuBar = new MenuBar();
        menuBar.setOpenOnHover(true);
        addItems(menuBar);
        // end::snippet[]
        add(menuBar);
    }

    private void addItems(MenuBar menuBar) {
        menuBar.addItem("View");
        menuBar.addItem("Edit");

        MenuItem share = menuBar.addItem("Share");
        SubMenu shareSubMenu = share.getSubMenu();
        MenuItem onSocialMedia = shareSubMenu.addItem("On social media");
        SubMenu socialMediaSubMenu = onSocialMedia.getSubMenu();
        socialMediaSubMenu.addItem("Facebook");
        socialMediaSubMenu.addItem("Twitter");
        socialMediaSubMenu.addItem("Instagram");
        shareSubMenu.addItem("By email");
        shareSubMenu.addItem("Get Link");

        MenuItem move = menuBar.addItem("Move");
        SubMenu moveSubMenu = move.getSubMenu();
        moveSubMenu.addItem("To folder");
        moveSubMenu.addItem("To trash");

        menuBar.addItem("Duplicate");
    }

    public static class Exporter extends DemoExporter<MenuBarOpenOnHover> { // hidden-source-line
    } // hidden-source-line
}