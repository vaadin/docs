package com.vaadin.demo.component.contextmenu;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.contextmenu.ContextMenu;
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.router.Route;

@Route("context-menu-disable-on-click")
public class ContextMenuDisableOnClick extends Div {

    public ContextMenuDisableOnClick() {
        Paragraph paragraph = new Paragraph();
        paragraph.setText(
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.");
        add(paragraph);

        ContextMenu menu = new ContextMenu(paragraph);
        // tag::snippet[]
        MenuItem summarize = menu.addItem("Summarize with AI");
        summarize.setDisableOnClick(true);
        // end::snippet[]
        summarize.setKeepOpen(true);
        summarize.addClickListener(event -> {
            // Simulate long-running operation
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                // ignore
            }
            summarize.setEnabled(true);
            paragraph.setText("Lorem ipsum dolor sit amet.");
        });
    }

    public static class Exporter
            extends DemoExporter<ContextMenuDisableOnClick> { // hidden-source-line
    } // hidden-source-line
}
