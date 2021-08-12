package com.vaadin.demo.component.upload;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H4;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MultiFileMemoryBuffer;
import com.vaadin.flow.router.Route;

@Route("upload-file-count")
public class UploadFileCount extends Div {

    public UploadFileCount() {
        MultiFileMemoryBuffer buffer = new MultiFileMemoryBuffer();
        // tag::snippet[]
        Upload upload = new Upload(buffer);
        upload.setMaxFiles(3);

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
        i18n.getError()
                .setTooManyFiles(
                        "You may only upload a maximum of three files at once.");
        upload.setI18n(i18n);

        H4 title = new H4("Upload files");
        title.getStyle().set("margin-top", "0");
        Paragraph hint = new Paragraph("Maximum of 3 files allowed");
        hint.getStyle().set("color", "var(--lumo-secondary-text-color)");

        add(title, hint, upload);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<UploadFileCount> { // hidden-source-line
    } // hidden-source-line
}
