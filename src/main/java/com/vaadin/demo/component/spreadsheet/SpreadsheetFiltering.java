package com.vaadin.demo.component.spreadsheet;

import org.apache.poi.ss.util.CellRangeAddress;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.spreadsheet.Spreadsheet;
import com.vaadin.flow.component.spreadsheet.SpreadsheetFilterTable;
import com.vaadin.flow.component.spreadsheet.SpreadsheetTable;

@Route("spreadsheet-filtering")
public class SpreadsheetFiltering extends Div {

    public SpreadsheetFiltering() {
        Spreadsheet spreadsheet = new Spreadsheet();
        // tag::snippet[]
        int maxColumns = 5;
        int maxRows = 5;

        for (int column = 1; column < maxColumns + 1; column++) {
            spreadsheet.createCell(1, column, "Column " + column);
        }

        for (int row = 2; row < maxRows + 2; row++) {
            for (int col = 1; col < maxColumns + 1; col++) {
                spreadsheet.createCell(row, col, row + col);
            }
        }
        CellRangeAddress range = new CellRangeAddress(1, maxRows, 1,
                maxColumns);
        SpreadsheetTable table = new SpreadsheetFilterTable(spreadsheet, range);
        spreadsheet.registerTable(table);
        spreadsheet.refreshAllCellValues();
        // end::snippet[]
        spreadsheet.setHeight("400px");
        add(spreadsheet);

    }

    public static class Exporter extends DemoExporter<SpreadsheetFiltering> { // hidden-source-line
    } // hidden-source-line
}
