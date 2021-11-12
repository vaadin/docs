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

@Route("upload-file-size")
public class UploadFileSize extends Div {

    public UploadFileSize() {
        MemoryBuffer buffer = new MemoryBuffer();
        // tag::snippet[]
        Upload upload = new Upload(buffer);

        int maxFileSizeInBytes = 10 * 1024 * 1024; // 10MB
        upload.setMaxFileSize(maxFileSizeInBytes);

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
                .setFileIsTooBig(
                        "The file exceeds the maximum allowed size of 10MB.");
        upload.setI18n(i18n);

        H4 title = new H4("Upload file");
        title.getStyle().set("margin-top", "0");
        Paragraph hint = new Paragraph("Maximum file size: 10 MB");
        hint.getStyle().set("color", "var(--lumo-secondary-text-color)");

        add(title, hint, upload);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<UploadFileSize> { // hidden-source-line
    } // hidden-source-line
}
