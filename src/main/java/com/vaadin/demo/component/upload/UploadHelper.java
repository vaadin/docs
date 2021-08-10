package com.vaadin.demo.component.upload;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H4;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import com.vaadin.flow.router.Route;

@Route("upload-helper")
public class UploadHelper extends Div {

    public UploadHelper() {
        MemoryBuffer buffer = new MemoryBuffer();
        // tag::snippet[]
        H4 title = new H4("Upload spreadsheet");
        Paragraph hint = new Paragraph(
                "File size must be less than or equal to 1 MB. Only Excel and CSV files are accepted.");

        Upload upload = new Upload(buffer);
        upload.setAcceptedFileTypes(
                // Microsoft Excel (.xls)
                "application/vnd.ms-excel",
                ".xls",
                // Microsoft Excel (OpenXML, .xlsx)
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                ".xlsx",
                // Comma-separated values (.csv)
                "text/csv",
                ".csv"
        );

        UploadExamplesI18N i18n = new UploadExamplesI18N();
        i18n.getAddFiles().setOne("Upload Spreadsheet...");
        i18n.getDropFiles().setOne("Drop spreadsheet here");
        i18n.getError()
                .setIncorrectFileType(
                        "Please provide the file in one of the supported formats (.xls, .xlsx, .csv).");
        upload.setI18n(i18n);

        add(title, hint, upload);
        // end::snippet[]

        title.getStyle().set("margin-top", "0");
        hint.getStyle().set("color", "var(--lumo-secondary-text-color)");

        upload.addFileRejectedListener(event -> {
            String errorMessage = event.getErrorMessage();

            Notification notification = Notification.show(
                    errorMessage,
                    5000,
                    Notification.Position.MIDDLE
            );
            notification.addThemeVariants(NotificationVariant.LUMO_ERROR);
        });

    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<UploadHelper> { // hidden-source-line
    } // hidden-source-line
}
