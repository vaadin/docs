package com.vaadin.demo.component.menubar;

import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.contextmenu.SubMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.component.menubar.MenuBarVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("menu-bar-combo-buttons")
public class MenuBarComboButtons extends Div {
    public MenuBarComboButtons() {
        // tag::snippet[]
        MenuBar menuBar = new MenuBar();
        menuBar.addThemeVariants(MenuBarVariant.LUMO_ICON, MenuBarVariant.LUMO_PRIMARY);
        menuBar.addItem("Save");
        MenuItem item = menuBar.addItem(new Icon(VaadinIcon.CHEVRON_DOWN));
        SubMenu subItems = item.getSubMenu();
        subItems.addItem("Save as draft");
        subItems.addItem("Save as copy");
        subItems.addItem("Save and publish");
        // end::snippet[]
        add(menuBar);
    }
    public static class Exporter extends DemoExporter<MenuBarComboButtons> { // hidden-source-line
    } // hidden-source-line
}
