package com.vaadin.demo.component.spreadsheet;

import org.apache.poi.ss.usermodel.ClientAnchor;
import org.apache.poi.ss.usermodel.Comment;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Drawing;
import org.apache.poi.xssf.usermodel.XSSFRichTextString;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.spreadsheet.Spreadsheet;

@Route("spreadsheet-comments")
public class SpreadsheetComments extends Div {

    public SpreadsheetComments() {
        Spreadsheet spreadsheet = new Spreadsheet();

        // tag::snippet[]
        Drawing<?> drawing = spreadsheet.getActiveSheet()
                .createDrawingPatriarch();
        CreationHelper factory = spreadsheet.getActiveSheet().getWorkbook()
                .getCreationHelper();

        ClientAnchor anchor = factory.createClientAnchor();
        Comment comment = drawing.createCellComment(anchor);
        comment.setString(new XSSFRichTextString("First cell comment"));

        spreadsheet.createCell(0, 0, "cell").setCellComment(comment);
        // end::snippet[]

        spreadsheet.setHeight("400px");
        add(spreadsheet);

    }

    public static class Exporter extends DemoExporter<SpreadsheetComments> { // hidden-source-line
    } // hidden-source-line
}
