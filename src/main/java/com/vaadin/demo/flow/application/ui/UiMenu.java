package com.vaadin.demo.flow.application.ui;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;

@Route("flow-application-ui-menu")
public class UiMenu extends Div {
    private static final long serialVersionUID = 1L;

    public UiMenu() {
        // tag::snippet[]
        // A layout with a menu and a content area
        HorizontalLayout mainLayout = new HorizontalLayout();

        // Create a vertical menu
        Tabs tabs = new Tabs();
        tabs.setOrientation(Tabs.Orientation.VERTICAL);

        // Add the menu items (simplified)
        tabs.add(new Tab("Hello World"),
                 new Tab("Card List"),
                 new Tab("About"));

        // The selection will be displayed here
        Div content = new Div();
        content.add("Content will be here");

        mainLayout.add(tabs, content);
        add(mainLayout);
        // end::snippet[]
    }

    public static class UiMenuExporter extends DemoExporter<UiMenu> { // hidden-source-line
    } // hidden-source-line    
}
