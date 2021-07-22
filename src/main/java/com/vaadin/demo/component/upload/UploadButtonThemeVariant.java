package com.vaadin.demo.component.upload;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import com.vaadin.flow.router.Route;

@Route("upload-button-theme-variant")
public class UploadButtonThemeVariant extends Div {

    public UploadButtonThemeVariant() {
        MemoryBuffer buffer = new MemoryBuffer();
        // tag::snippet[]
        Upload upload = new Upload(buffer);
        upload.setAcceptedFileTypes("application/pdf", ".pdf");

        Button uploadButton = new Button("Upload PDF...");
        uploadButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        upload.setUploadButton(uploadButton);

        // Disable the upload button after the file is selected
        // Re-enable the upload button after the file is cleared
        upload.getElement().addEventListener("max-files-reached-changed", event -> {
            boolean maxFilesReached = event.getEventData().getBoolean("event.detail.value");
            uploadButton.setEnabled(!maxFilesReached);
        }).addEventData("event.detail.value");
        // end::snippet[]

        UploadExamplesI18N i18N = new UploadExamplesI18N();
        i18N.getDropFiles().setOne("Drop PDF here");
        upload.setI18n(i18N);

        add(upload);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<UploadButtonThemeVariant> { // hidden-source-line
    } // hidden-source-line
}
