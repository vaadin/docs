package com.vaadin.demo.component.spreadsheet;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.spreadsheet.Spreadsheet;
import com.vaadin.flow.component.spreadsheet.SpreadsheetComponentFactory;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Sheet;

@Route("spreadsheet-components")
public class SpreadsheetComponents extends Div {

    public SpreadsheetComponents()  {
        Spreadsheet spreadsheet = new Spreadsheet();
        spreadsheet.setColumnWidth(1, 80);
        Button customComponent = new Button("Click");

        // tag::snippet[]
        spreadsheet.setSpreadsheetComponentFactory(
                new SpreadsheetComponentFactory() {

                    @Override
                    public Component getCustomComponentForCell(Cell cell,
                                                               int rowIndex, int columnIndex,
                                                               Spreadsheet spreadsheet, Sheet sheet) {
                        if (rowIndex == 1 && columnIndex == 1) {
                            return customComponent;
                        }
                        return null;
                    }

                    @Override
                    public Component getCustomEditorForCell(Cell cell,
                                                            int rowIndex, int columnIndex,
                                                            Spreadsheet spreadsheet, Sheet sheet) {
                        return null;
                    }

                    @Override
                    public void onCustomEditorDisplayed(Cell cell, int rowIndex,
                                                        int columnIndex, Spreadsheet spreadsheet,
                                                        Sheet sheet, Component customEditor) {
                    }
                });
        // end::snippet[]

        spreadsheet.setHeight("400px");
        add(spreadsheet);
    }

    public static class Exporter extends DemoExporter<SpreadsheetComponents> { // hidden-source-line
    } // hidden-source-line
}
