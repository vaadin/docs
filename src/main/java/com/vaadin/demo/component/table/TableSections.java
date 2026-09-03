package com.vaadin.demo.component.table;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Table;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("table-sections")
public class TableSections extends Div {

    public TableSections() {
        // tag::snippet[]
        Table table = new Table();
        table.setCaptionText("Quarterly revenue");

        // The row factories create the section they need on demand
        table.addHeaderRow("Quarter", "Revenue");
        table.addRow("Q1", "1,200");
        table.addRow("Q2", "1,450");
        table.addRow("Q3", "1,610");
        table.addFooterRow("Total", "4,260");

        // Address a section directly only when you need it as a whole
        table.getHead().getStyle().set("background-color",
                "var(--lumo-contrast-5pct)");
        table.getFoot().getStyle().set("font-weight", "bold");
        // end::snippet[]

        Styles.applyTo(table); // hidden-source-line
        add(table);
    }

    public static class Exporter extends DemoExporter<TableSections> { // hidden-source-line
    } // hidden-source-line
}
