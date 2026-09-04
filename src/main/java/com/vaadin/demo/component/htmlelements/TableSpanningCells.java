package com.vaadin.demo.component.htmlelements;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Table;
import com.vaadin.flow.component.html.TableHeaderCell;
import com.vaadin.flow.component.html.TableRow;
import com.vaadin.flow.router.Route;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("table-spanning-cells")
public class TableSpanningCells extends Div {

    public TableSpanningCells() {
        setClassName("html-table-example"); // hidden-source-line
        // tag::snippet[]
        Table table = new Table();
        table.setId("sales");
        table.setCaptionText("Units sold by category");

        table.addHeaderRow("Category", "Product", "Units");

        TableRow fruit = table.addRow();
        fruit.addRowGroupHeaderCell("Fruit", 2);
        fruit.addDataCells("Apples", "1,200");
        table.addRow("Oranges", "900");

        TableRow vegetables = table.addRow();
        vegetables.addRowGroupHeaderCell("Vegetables", 2);
        vegetables.addDataCells("Carrots", "450");
        table.addRow("Potatoes", "780");

        TableRow total = table.addFooterRow();
        TableHeaderCell totalLabel = total.addRowHeaderCell("Total");
        totalLabel.setColspan(2);
        total.addDataCell("3,330");

        add(table);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<TableSpanningCells> { // hidden-source-line
    } // hidden-source-line
}
