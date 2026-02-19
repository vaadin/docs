package com.vaadin.demo.component.upload;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.streams.UploadHandler;

@Route("upload-labelling")
public class UploadLabelling extends Div {

    public UploadLabelling() {
        UploadHandler inMemoryUploadHandler = UploadHandler
                .inMemory((uploadMetadata, bytes) -> {
                });
        // tag::snippet[]
        Upload upload = new Upload(inMemoryUploadHandler);
        upload.setAcceptedFileTypes("application/pdf", ".pdf");

        UploadExamplesI18N i18n = new UploadExamplesI18N();
        i18n.getAddFiles().setOne("Upload PDF...");
        i18n.getDropFiles().setOne("Drop PDF here");
        i18n.getError().setIncorrectFileType(
                "The provided file does not have the correct format (PDF document).");
        upload.setI18n(i18n);
        // end::snippet[]

        upload.addFileRejectedListener(event -> {
            String errorMessage = event.getErrorMessage();

            Notification notification = Notification.show(errorMessage, 5000,
                    Notification.Position.MIDDLE);
            notification.addThemeVariants(NotificationVariant.LUMO_ERROR);
        });

        add(upload);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<UploadLabelling> { // hidden-source-line
    } // hidden-source-line
}
