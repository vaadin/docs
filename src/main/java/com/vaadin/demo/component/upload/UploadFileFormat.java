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

@Route("upload-file-format")
public class UploadFileFormat extends Div {

    public UploadFileFormat() {
        MemoryBuffer buffer = new MemoryBuffer();
        // tag::snippet[]
        Upload upload = new Upload(buffer);
        upload.setAcceptedFileTypes("application/pdf", ".pdf");

        upload.addFileRejectedListener(event -> {
            String errorMessage = event.getErrorMessage();

            Notification notification = Notification.show(
                    errorMessage,
                    5000,
                    Notification.Position.MIDDLE
            );
            notification.addThemeVariants(NotificationVariant.LUMO_ERROR);
        });
        // end::snippet[]

        UploadExamplesI18N i18n = new UploadExamplesI18N();
        i18n.getAddFiles().setOne("Upload Report...");
        i18n.getDropFiles().setOne("Drop report here");
        i18n.getError()
                .setIncorrectFileType(
                        "The provided file does not have the correct format. Please provide a PDF document.");
        upload.setI18n(i18n);

        H4 title = new H4("Upload report");
        title.getStyle().set("margin-top", "0");
        Paragraph hint = new Paragraph("Accepted file formats: PDF (.pdf)");
        hint.getStyle().set("color", "var(--lumo-secondary-text-color)");

        add(title, hint, upload);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<UploadFileFormat> { // hidden-source-line
    } // hidden-source-line
}
