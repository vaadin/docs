package com.vaadin.demo.component.spreadsheet;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.spreadsheet.Spreadsheet;
import com.vaadin.flow.component.spreadsheet.SpreadsheetComponentFactory;
import com.vaadin.flow.component.textfield.TextField;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Sheet;

@Route("spreadsheet-components")
public class SpreadsheetComponents extends Div {

    private Button customComponent;
    private TextField customEditor;

    public SpreadsheetComponents() {
        Spreadsheet spreadsheet = new Spreadsheet();

        spreadsheet.setColumnWidth(1, 120);
        spreadsheet.createCell(1, 1, "Button");

        spreadsheet.setColumnWidth(2, 120);
        spreadsheet.createCell(1, 2, "Text Field");

        // tag::snippet[]
        spreadsheet.setSpreadsheetComponentFactory(
                new SpreadsheetComponentFactory() {

                    @Override
                    public Component getCustomComponentForCell(Cell cell,
                            int rowIndex, int columnIndex,
                            Spreadsheet spreadsheet, Sheet sheet) {
                        if (spreadsheet.getActiveSheetIndex() == 0
                                && rowIndex == 2 && columnIndex == 1) {
                            if (customComponent == null) {
                                initCustomComponent();
                            }
                            return customComponent;
                        }
                        return null;
                    }

                    @Override
                    public Component getCustomEditorForCell(Cell cell,
                            int rowIndex, int columnIndex,
                            Spreadsheet spreadsheet, Sheet sheet) {
                        if (spreadsheet.getActiveSheetIndex() == 0
                                && rowIndex == 2 && columnIndex == 2) {
                            if (customEditor == null) {
                                initCustomEditor(rowIndex, columnIndex,
                                        spreadsheet);
                            }
                            return customEditor;
                        }
                        return null;
                    }

                    @Override
                    public void onCustomEditorDisplayed(Cell cell, int rowIndex,
                            int columnIndex, Spreadsheet spreadsheet,
                            Sheet sheet, Component editor) {
                        if (cell == null) {
                            return;
                        }
                        ((TextField) editor)
                                .setValue(cell.getStringCellValue());
                    }
                });
        // end::snippet[]

        spreadsheet.setHeight("400px");
        add(spreadsheet);
    }

    private void initCustomComponent() {
        customComponent = new Button("Click");
        customComponent.setSizeFull();
        customComponent.getElement().getStyle().set("color-scheme", "light")
                .set("--vaadin-button-background", "hsl(0, 0%, 95%)")
                .set("--vaadin-button-text-color", "hsl(0, 0%, 10%)")
                .set("--vaadin-button-border-color", "hsl(0, 0%, 80%)");
    }

    private void initCustomEditor(int rowIndex, int columnIndex,
            Spreadsheet spreadsheet) {
        customEditor = new TextField();
        customEditor.setSizeFull();
        customEditor.getElement().getStyle().set("color-scheme", "light")
                .set("--vaadin-input-field-background", "hsl(0, 0%, 95%)")
                .set("--vaadin-input-field-value-color", "hsl(0, 0%, 10%)")
                .set("--vaadin-input-field-border-color", "hsl(0, 0%, 80%)");
        customEditor.addValueChangeListener(e -> spreadsheet.refreshCells(
                spreadsheet.createCell(rowIndex, columnIndex, e.getValue())));
    }

    public static class Exporter extends DemoExporter<SpreadsheetComponents> { // hidden-source-line
    } // hidden-source-line
}
