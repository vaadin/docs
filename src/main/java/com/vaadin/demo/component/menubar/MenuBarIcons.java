package com.vaadin.demo.component.menubar;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.contextmenu.HasMenuItems;
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.contextmenu.SubMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("menu-bar-icons")
public class MenuBarIcons extends Div {
    public MenuBarIcons() {
        // tag::snippet[]
        MenuBar menuBar = new MenuBar();
        menuBar.setThemeName("icon");
        MenuItem share = createItem(menuBar, VaadinIcon.SHARE, "Share");
        SubMenu shareSubMenu = share.getSubMenu();
        createItem(shareSubMenu, VaadinIcon.SHARE, "By Email", true);
        createItem(shareSubMenu, VaadinIcon.LINK, "Get link", true);
        createItem(menuBar, VaadinIcon.COPY, "");
        // end::snippet[]
        add(menuBar);
    }

    private MenuItem createItem(HasMenuItems menu, VaadinIcon iconName, String label) {
        return createItem(menu, iconName, label, false);
    }
    private MenuItem createItem(HasMenuItems menu, VaadinIcon iconName, String label, boolean isChild) {
        Icon icon = new Icon(iconName);

        if (isChild) {
            icon.getStyle().set("width", "var(--lumo-icon-size-s)");
            icon.getStyle().set("height", "var(--lumo-icon-size-s)");
            icon.getStyle().set("marginRight", "var(--lumo-space-s)");
        }

        MenuItem item = menu.addItem(icon, e -> {});

        if (iconName.equals(VaadinIcon.COPY)) {
            item.getElement().setAttribute("aria-label", "duplicate");
        }

        item.add(new Text(label));
        return item;
    }

    public static class Exporter extends DemoExporter<MenuBarIcons> { // hidden-source-line
    } // hidden-source-line
}
