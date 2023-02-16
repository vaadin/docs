package com.vaadin.demo.component.spreadsheet;

import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.spreadsheet.Spreadsheet;

@Route("spreadsheet-charts")
public class SpreadsheetCharts extends Div {

    public SpreadsheetCharts() throws IOException, URISyntaxException {
        // tag::snippet[]
        // The example file rainfall.xlsx contains a pre-configured chart
        InputStream stream = getClass()
                .getResourceAsStream("/testsheets/rainfall.xlsx");

        Spreadsheet spreadsheet = new Spreadsheet(stream);
        // end::snippet[]
        spreadsheet.setHeight("400px");
        add(spreadsheet);

    }

    public static class Exporter extends DemoExporter<SpreadsheetCharts> { // hidden-source-line
    } // hidden-source-line
}
