package com.vaadin.demo.component.htmlelements;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Table;
import com.vaadin.flow.component.html.TableColumn;
import com.vaadin.flow.component.html.TableColumnGroup;
import com.vaadin.flow.router.Route;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("table-column-groups")
public class TableColumnGroups extends Div {

    public TableColumnGroups() {
        setClassName("html-table-example"); // hidden-source-line
        // tag::snippet[]
        Table table = new Table();
        table.setCaptionText("Subscription plans");

        TableColumnGroup columns = table.addColumnGroup();
        columns.addColumn(2);
        TableColumn recommended = columns.addColumn();
        recommended.setClassName("highlight");

        table.addHeaderRow("Feature", "Standard", "Enterprise");
        table.addRowWithHeader("Seats", "10", "Unlimited");
        table.addRowWithHeader("Support", "Business hours", "24/7");

        add(table);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<TableColumnGroups> { // hidden-source-line
    } // hidden-source-line
}
