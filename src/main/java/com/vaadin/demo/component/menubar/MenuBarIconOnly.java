package com.vaadin.demo.component.menubar;

import com.vaadin.flow.component.contextmenu.HasMenuItems;
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.contextmenu.SubMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("menu-bar-icon-only")
public class MenuBarIconOnly extends Div {
    public MenuBarIconOnly() {
        // tag::snippet[]
        MenuBar menuBar = new MenuBar();
        menuBar.setThemeName("tertiary-inline");

        createItem(menuBar, VaadinIcon.EYE, "View");
        createItem(menuBar, VaadinIcon.PENCIL, "Edit");

        MenuItem share = createItem(menuBar, VaadinIcon.SHARE, "Share");
        SubMenu shareSubMenu = share.getSubMenu();
        MenuItem onSocialMedia = shareSubMenu.addItem("On social media");
        SubMenu socialMediaSubMenu = onSocialMedia.getSubMenu();
        socialMediaSubMenu.addItem("Facebook");
        socialMediaSubMenu.addItem("Twitter");
        socialMediaSubMenu.addItem("Instagram");
        shareSubMenu.addItem("By email");
        shareSubMenu.addItem("Get Link");

        MenuItem move = createItem(menuBar, VaadinIcon.FOLDER, "Move");
        SubMenu moveSubMenu = move.getSubMenu();
        moveSubMenu.addItem("To folder");
        moveSubMenu.addItem("To trash");

        createItem(menuBar, VaadinIcon.COPY, "Duplicate");
        // end::snippet[]
        add(menuBar);
    }

    private MenuItem createItem(HasMenuItems menu, VaadinIcon iconName, String ariaLabel) {
        Icon icon = new Icon(iconName);

        MenuItem item = menu.addItem(icon, e -> {
        });

        item.getElement().setAttribute("aria-label", ariaLabel);

        return item;
    }

    public static class Exporter extends DemoExporter<MenuBarIconOnly> { // hidden-source-line
    } // hidden-source-line
}