package com.vaadin.demo.component.spreadsheet;

import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.spreadsheet.Spreadsheet;

@Route("spreadsheet-loading")
public class SpreadsheetLoading extends Div {

    public SpreadsheetLoading() throws IOException, URISyntaxException {
        // tag::snippet[]
        InputStream stream = getClass()
                .getResourceAsStream("/testsheets/simple-invoice.xlsx");

        Spreadsheet spreadsheet = new Spreadsheet(stream);
        // end::snippet[]
        spreadsheet.setHeight("400px");
        add(spreadsheet);

    }

    public static class Exporter extends DemoExporter<SpreadsheetLoading> { // hidden-source-line
    } // hidden-source-line
}
