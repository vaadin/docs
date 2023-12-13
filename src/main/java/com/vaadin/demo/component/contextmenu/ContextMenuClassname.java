package com.vaadin.demo.component.contextmenu;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.contextmenu.ContextMenu;
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("context-menu-classname")
public class ContextMenuClassname extends Div {

    public ContextMenuClassname() {
        Button button = new Button("Actions");
        ContextMenu menu = new ContextMenu();

        menu.setTarget(button);
        menu.setOpenOnClick(true);

        menu.addItem("Share");
        menu.addItem("Duplicate");
        // tag::snippet[]
        MenuItem item = menu.addItem("Delete");
        item.setClassName("text-error");
        // end::snippet[]

        add(button);
    }

    public static class Exporter extends DemoExporter<ContextMenuClassname> { // hidden-source-line
    } // hidden-source-line
}
