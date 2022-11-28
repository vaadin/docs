package com.vaadin.demo.component.spreadsheet;

import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.spreadsheet.Spreadsheet;

@Route("spreadsheet-fonts")
public class SpreadsheetFonts extends Div {

    public SpreadsheetFonts() {

        Spreadsheet spreadsheet = new Spreadsheet();
        spreadsheet.setHeight("400px");

        // tag::snippet[]
        // Create a cell
        Cell cell = spreadsheet.createCell(2, 2, "Styled");

        // Create and configure a cell style
        CellStyle cellStyle = spreadsheet.getWorkbook().createCellStyle();
        // Add a blue bottom border
        cellStyle.setBorderBottom(BorderStyle.THICK);
        cellStyle.setBottomBorderColor(IndexedColors.BLUE.getIndex());
        // Set the text to bold
        Font font = spreadsheet.getWorkbook().createFont();
        font.setBold(true);
        cellStyle.setFont(font);

        // Apply the cell style to the cell
        cell.setCellStyle(cellStyle);

        // Request spreadsheet to refresh the cell
        spreadsheet.refreshCells(cell);
        // end::snippet[]
        add(spreadsheet);
    }

    public static class Exporter extends DemoExporter<SpreadsheetFonts> { // hidden-source-line
    } // hidden-source-line
}
