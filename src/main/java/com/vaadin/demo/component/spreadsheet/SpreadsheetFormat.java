package com.vaadin.demo.component.spreadsheet;

import java.util.GregorianCalendar;

import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.spreadsheet.Spreadsheet;

@Route("spreadsheet-format")
public class SpreadsheetFormat extends Div {

    public SpreadsheetFormat() {
        Spreadsheet spreadsheet = new Spreadsheet();
        spreadsheet.setHeight("400px");
        // tag::snippet[]
        // Define a cell style for dates
        CellStyle dateStyle = spreadsheet.getWorkbook().createCellStyle();
        DataFormat format = spreadsheet.getWorkbook().createDataFormat();
        dateStyle.setDataFormat(format.getFormat("yyyy-mm-dd"));

        // Add some data rows
        spreadsheet.createCell(1, 0, "Nicolaus");
        spreadsheet.createCell(1, 1, "Copernicus");
        spreadsheet.createCell(1, 2,
                new GregorianCalendar(1999, 2, 19).getTime());

        // Style the date cell
        spreadsheet.getCell(1, 2).setCellStyle(dateStyle);
        // end::snippet[]
        add(spreadsheet);
    }

    public static class Exporter extends DemoExporter<SpreadsheetFormat> { // hidden-source-line
    } // hidden-source-line
}
