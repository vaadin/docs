package com.vaadin.demo.flow.application.events;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.tabs.TabsVariant;
import com.vaadin.flow.router.Route;

@Route("application-events-menu")
public class UiMenu extends Div {
    private static final long serialVersionUID = 1L;

    public UiMenu() {
        // tag::snippet[]
        // Create the menu component
        final Tabs tabs = new Tabs();
        tabs.setOrientation(Tabs.Orientation.VERTICAL);
        tabs.addThemeVariants(TabsVariant.LUMO_MINIMAL);

        // Add the menu items (simplified)
        tabs.add(new Tab("Hello World"),
                 new Tab("Card List"),
                 new Tab("About"));

        add(tabs);
        add(new Button("My button my button"));
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<UiMenu> { // hidden-source-line
    } // hidden-source-line    
}
