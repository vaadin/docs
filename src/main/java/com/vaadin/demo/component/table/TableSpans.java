package com.vaadin.demo.component.table;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Table;
import com.vaadin.flow.component.html.TableRow;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("table-spans")
public class TableSpans extends Div {

    public TableSpans() {
        // tag::snippet[]
        Table table = new Table();
        table.setCaptionText("Animals");

        // A span goes on the cell the factory hands back
        table.addRow().addHeaderCell("Animals").setColspan(2);
        table.addRow().addHeaderCell("Hippopotamus").setColspan(2);

        TableRow horse = table.addRow();
        horse.addRowHeaderCell("Horse").setRowspan(2);
        horse.addDataCell("Mare");
        table.addRow("Stallion");

        TableRow chicken = table.addRow();
        chicken.addRowHeaderCell("Chicken").setRowspan(2);
        chicken.addDataCell("Hen");
        table.addRow("Rooster");
        // end::snippet[]

        Styles.applyTo(table); // hidden-source-line
        add(table);
    }

    public static class Exporter extends DemoExporter<TableSpans> { // hidden-source-line
    } // hidden-source-line
}
