package com.vaadin.demo.component.table;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Table;
import com.vaadin.flow.component.html.TableDataCell;
import com.vaadin.flow.component.html.TableRow;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.signals.local.ListSignal;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("table-rows-signal")
public class TableRowsSignal extends Div {

    public TableRowsSignal() {
        // tag::snippet[]
        ListSignal<String> tasks = new ListSignal<>();
        tasks.insertLast("Write the docs");
        tasks.insertLast("Review the docs");

        Table table = new Table();
        table.addHeaderRow("Task");

        // The rows of the <tbody> follow the signal
        table.getBody().bindChildren(tasks,
                task -> new TableRow(new TableDataCell(task)));

        Button addTask = new Button("Add task", event -> tasks
                .insertLast("Task " + (tasks.peek().size() + 1)));
        // end::snippet[]

        Styles.applyTo(table); // hidden-source-line
        add(new VerticalLayout(table, addTask));
    }

    public static class Exporter extends DemoExporter<TableRowsSignal> { // hidden-source-line
    } // hidden-source-line
}
