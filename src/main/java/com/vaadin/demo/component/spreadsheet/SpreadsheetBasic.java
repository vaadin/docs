package com.vaadin.demo.component.spreadsheet;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.spreadsheet.Spreadsheet;

@Route("spreadsheet-basic")
public class SpreadsheetBasic extends Div {

    public SpreadsheetBasic() {
        // tag::snippet[]
        Spreadsheet spreadsheet = new Spreadsheet();
        spreadsheet.setHeight("400px");
        add(spreadsheet);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<SpreadsheetBasic> { // hidden-source-line
    } // hidden-source-line
}
