package com.vaadin.demo.component.upload;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.button.Button;
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

        Button uploadButton = new Button("Select Files...");
        upload.setUploadButton(uploadButton);
        // end::snippet[]

        add(upload);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<UploadAutoUploadDisabled> { // hidden-source-line
    } // hidden-source-line
}
