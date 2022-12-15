package com.vaadin.demo.component.menubar;

import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.component.menubar.MenuBarVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("menu-bar-tooltip")
public class MenuBarTooltip extends Div {
    public MenuBarTooltip() {
        // tag::snippet[]
        MenuBar menuBar = new MenuBar();
        menuBar.addThemeVariants(MenuBarVariant.LUMO_ICON);

        createIconItem(menuBar, VaadinIcon.EYE, "View");
        createIconItem(menuBar, VaadinIcon.PENCIL, "Edit");
        createIconItem(menuBar, VaadinIcon.FOLDER, "Move");
        createIconItem(menuBar, VaadinIcon.COPY, "Duplicate");
        MenuItem archive = createIconItem(menuBar, VaadinIcon.ARCHIVE,
                "Archive");
        archive.setEnabled(false);
        // end::snippet[]
        add(menuBar);
    }

    // tag::createIcon[]
    private MenuItem createIconItem(MenuBar menu, VaadinIcon iconName,
            String tooltipText) {
        Icon icon = new Icon(iconName);
        MenuItem item = menu.addItem(icon, tooltipText);
        return item;
    }
    // end::createIcon[]

    public static class Exporter extends DemoExporter<MenuBarTooltip> { // hidden-source-line
    } // hidden-source-line
}
