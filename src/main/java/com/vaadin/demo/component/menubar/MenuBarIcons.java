package com.vaadin.demo.component.menubar;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.contextmenu.HasMenuItems;
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.contextmenu.SubMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.component.menubar.MenuBarVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("menu-bar-icons")
public class MenuBarIcons extends Div {
    public MenuBarIcons() {
        // tag::snippet[]
        MenuBar menuBar = new MenuBar();
        menuBar.addThemeVariants(MenuBarVariant.LUMO_ICON);
        MenuItem share = createIconItem(menuBar, VaadinIcon.SHARE, "Share", null);
        SubMenu shareSubMenu = share.getSubMenu();
        createIconItem(shareSubMenu, VaadinIcon.SHARE, "By Email", null, true);
        createIconItem(shareSubMenu, VaadinIcon.LINK, "Get link", null, true);
        createIconItem(menuBar, VaadinIcon.COPY, null, "duplicate");
        // end::snippet[]
        add(menuBar);
    }

    // tag::createIcon[]
    private MenuItem createIconItem(HasMenuItems menu, VaadinIcon iconName, String label, String ariaLabel) {
        return createIconItem(menu, iconName, label, ariaLabel, false);
    }
    private MenuItem createIconItem(HasMenuItems menu, VaadinIcon iconName, String label, String ariaLabel, boolean isChild) {
        Icon icon = new Icon(iconName);

        if (isChild) {
            icon.getStyle().set("width", "var(--lumo-icon-size-s)");
            icon.getStyle().set("height", "var(--lumo-icon-size-s)");
            icon.getStyle().set("marginRight", "var(--lumo-space-s)");
        }

        MenuItem item = menu.addItem(icon, e -> {
        });

        if (ariaLabel != null) {
            item.getElement().setAttribute("aria-label", ariaLabel);
        }

        if (label != null) {
            item.add(new Text(label));
        }

        return item;
    }
    // end::createIcon[]

    public static class Exporter extends DemoExporter<MenuBarIcons> { // hidden-source-line
    } // hidden-source-line
}
