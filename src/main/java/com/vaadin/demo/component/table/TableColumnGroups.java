package com.vaadin.demo.component.table;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Table;
import com.vaadin.flow.component.html.TableColumn;
import com.vaadin.flow.component.html.TableColumnGroup;
import com.vaadin.flow.component.html.TableRow;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("table-column-groups")
public class TableColumnGroups extends Div {

    public TableColumnGroups() {
        // tag::snippet[]
        Table table = new Table();
        table.setCaptionText("School timetable");

        TableColumnGroup columns = table.addColumnGroup();
        // The column holding the row headers
        columns.addColumn();
        // One <col span="5"> covering the five weekdays
        TableColumn weekdays = columns.addColumn(5);
        weekdays.getStyle().set("background-color",
                "var(--lumo-primary-color-10pct)");
        // And one covering the two weekend days
        TableColumn weekend = columns.addColumn(2);
        weekend.getStyle().set("background-color",
                "var(--lumo-contrast-10pct)");

        TableRow header = table.addHeaderRow();
        // The corner cell above the row headers is left empty
        header.addDataCell();
        header.addColumnHeaderCells("Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
                "Sun");

        table.addRowWithHeader("1st period", "English", "", "", "German",
                "Dutch", "", "");
        table.addRowWithHeader("2nd period", "English", "English", "",
                "German", "Dutch", "", "");
        // end::snippet[]

        Styles.applyTo(table); // hidden-source-line
        add(table);
    }

    public static class Exporter extends DemoExporter<TableColumnGroups> { // hidden-source-line
    } // hidden-source-line
}
