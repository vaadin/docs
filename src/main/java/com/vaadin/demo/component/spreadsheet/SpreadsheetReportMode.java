package com.vaadin.demo.component.spreadsheet;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.spreadsheet.Spreadsheet;

@Route("spreadsheet-report-mode")
public class SpreadsheetReportMode extends Div {

    public SpreadsheetReportMode() throws IOException, URISyntaxException {
        File file = new File(getClass()
                .getResource("/testsheets/simple-invoice.xlsx").toURI());

        Spreadsheet spreadsheet = new Spreadsheet(file);
        // tag::snippet[]
        spreadsheet.setReportStyle(true);
        spreadsheet.setActiveSheetProtected("");
        spreadsheet.setRowColHeadingsVisible(false);
        // end::snippet[]
        spreadsheet.setHeight("400px");
        add(spreadsheet);

    }

    public static class Exporter extends DemoExporter<SpreadsheetReportMode> { // hidden-source-line
    } // hidden-source-line
}
