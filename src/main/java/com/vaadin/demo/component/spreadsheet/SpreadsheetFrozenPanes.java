package com.vaadin.demo.component.spreadsheet;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.spreadsheet.Spreadsheet;

@Route("spreadsheet-frozen-panes")
public class SpreadsheetFrozenPanes extends Div {

    public SpreadsheetFrozenPanes() {
        Spreadsheet spreadsheet = new Spreadsheet();
        spreadsheet.setHeight("400px");
        // tag::snippet[]
        spreadsheet.createFreezePane(2, 1);
        // end::snippet[]
        add(spreadsheet);
    }

    public static class Exporter extends DemoExporter<SpreadsheetFrozenPanes> { // hidden-source-line
    } // hidden-source-line
}
