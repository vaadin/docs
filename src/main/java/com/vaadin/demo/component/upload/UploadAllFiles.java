package com.vaadin.demo.component.upload;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MultiFileMemoryBuffer;
import com.vaadin.flow.router.Route;

@Route("upload-all-files")
public class UploadAllFiles extends Div {

    public UploadAllFiles() {
        MultiFileMemoryBuffer buffer = new MultiFileMemoryBuffer();
        // tag::snippet[]
        Upload upload = new Upload(buffer);
        upload.setAutoUpload(false);

        Button uploadAllButton = new Button("Upload All Files");
        uploadAllButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        uploadAllButton.addClickListener(event -> {
            // No explicit Flow API for this at the moment
            upload.getElement().callJsFunction("uploadFiles");
        });

        // end::snippet[]
        UploadExamplesI18N i18n = new UploadExamplesI18N();
        i18n.getAddFiles()
                .setMany("Select Files...");
        upload.setI18n(i18n);

        upload.getElement().executeJs("this.files = this.createFakeFilesUploadAllFiles()"); // hidden-source-line

        add(upload, uploadAllButton);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<UploadAllFiles> { // hidden-source-line
    } // hidden-source-line
}
