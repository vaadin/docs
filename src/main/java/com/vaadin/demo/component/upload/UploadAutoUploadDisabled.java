package com.vaadin.demo.component.upload;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MultiFileMemoryBuffer;
import com.vaadin.flow.router.Route;

@Route("upload-auto-upload-disabled")
public class UploadAutoUploadDisabled extends Div {

    public UploadAutoUploadDisabled() {
        MultiFileMemoryBuffer buffer = new MultiFileMemoryBuffer();
        // tag::snippet[]
        Upload upload = new Upload(buffer);
        upload.setAutoUpload(false);

        UploadExamplesI18N i18n = new UploadExamplesI18N();
        i18n.getAddFiles()
                .setMany("Select Files...");
        upload.setI18n(i18n);
        // end::snippet[]

        upload.getElement().executeJs("this.files = this.createFakeFilesUploadAutoUploadDisabled()"); // hidden-source-line

        add(upload);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<UploadAutoUploadDisabled> { // hidden-source-line
    } // hidden-source-line
}
