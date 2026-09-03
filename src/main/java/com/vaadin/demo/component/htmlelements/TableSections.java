package com.vaadin.demo.component.htmlelements;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Table;
import com.vaadin.flow.component.html.TableRow;
import com.vaadin.flow.router.Route;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("table-sections")
public class TableSections extends Div {

    public TableSections() {
        setClassName("html-table-example"); // hidden-source-line
        // tag::snippet[]
        Table table = new Table();
        table.setCaptionText("Quarterly revenue, in thousands of euros");

        table.getHead().addRow().addColumnHeaderCells("Quarter", "Revenue");

        table.getBody().addRow().addDataCells("Q1", "1,200");
        table.getBody().addRow().addDataCells("Q2", "1,450");

        TableRow total = table.getFoot().addRow();
        total.addRowHeaderCell("Total");
        total.addDataCell("2,650");

        add(table);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<TableSections> { // hidden-source-line
    } // hidden-source-line
}
