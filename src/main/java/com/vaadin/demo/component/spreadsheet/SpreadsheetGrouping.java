package com.vaadin.demo.component.spreadsheet;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.spreadsheet.Spreadsheet;

@Route("spreadsheet-grouping")
public class SpreadsheetGrouping extends Div {

    public SpreadsheetGrouping() throws IOException, URISyntaxException {
        // tag::snippet[]
        File file = new File(
                getClass().getResource("/testsheets/grouping.xlsx").toURI());

        Spreadsheet spreadsheet = new Spreadsheet(file);
        // end::snippet[]
        spreadsheet.setHeight("400px");
        add(spreadsheet);

    }

    public static class Exporter extends DemoExporter<SpreadsheetGrouping> { // hidden-source-line
    } // hidden-source-line
}
