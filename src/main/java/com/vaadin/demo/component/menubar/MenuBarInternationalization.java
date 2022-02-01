package com.vaadin.demo.component.menubar;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.contextmenu.SubMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.router.Route;

@Route("menu-bar-internationalization")
public class MenuBarInternationalization extends Div {

  public MenuBarInternationalization() {
    // tag::snippet[]
    MenuBar menuBar = new MenuBar();
    MenuBar.MenuBarI18n customI18n = new MenuBar.MenuBarI18n()
            // Provide accessible label for the overflow menu button
            // to screen readers
            .setMoreOptions("More actions");

    menuBar.setI18n(customI18n);
    // end::snippet[]

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

    add(menuBar);
  }

  public static class Exporter extends DemoExporter<MenuBarInternationalization> { // hidden-source-line
  } // hidden-source-line
}
