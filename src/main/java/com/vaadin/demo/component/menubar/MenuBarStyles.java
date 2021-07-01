package com.vaadin.demo.component.menubar;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("menu-bar-styles")
public class MenuBarStyles extends Div {
    public MenuBarStyles() {
        // tag::snippet[]
        MenuBar menuWithDefaultTheme = new MenuBar();
        addItem(menuWithDefaultTheme, "Default");

        MenuBar menuWithTertiaryTheme = new MenuBar();
        menuWithTertiaryTheme.setThemeName("tertiary");
        addItem(menuWithTertiaryTheme, "Tertiary");

        MenuBar menuWithPrimaryTheme = new MenuBar();
        menuWithPrimaryTheme.setThemeName("primary");
        addItem(menuWithPrimaryTheme, "Primary");

        MenuBar menuWithSmallTheme = new MenuBar();
        menuWithSmallTheme.setThemeName("small");
        addItem(menuWithSmallTheme, "Small");
        // end::snippet[]

        setInlineBlock(menuWithDefaultTheme);
        setInlineBlock(menuWithTertiaryTheme);
        setInlineBlock(menuWithPrimaryTheme);
        setInlineBlock(menuWithSmallTheme);

        add(menuWithDefaultTheme, menuWithTertiaryTheme, menuWithPrimaryTheme, menuWithSmallTheme);
    }

    private void addItem(MenuBar menuItem, String label) {
        menuItem.addItem(label)
                .getSubMenu()
                .addItem("Item");
    }

    private void setInlineBlock(MenuBar menuBar) {
        menuBar.getStyle().set("display", "inline-block");
    }

    public static class Exporter extends DemoExporter<MenuBarStyles> { // hidden-source-line
    } // hidden-source-line
}