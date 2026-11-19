package com.vaadin.demo.component.upload;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.UploadCapture;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.streams.UploadHandler;

@Route("upload-media-capture")
public class UploadMediaCapture extends Div {

    public UploadMediaCapture() {
        UploadHandler inMemoryUploadHandler = UploadHandler
                .inMemory((uploadMetadata, bytes) -> {
                    // The example doesn't process the uploaded photo
                });
        // tag::snippet[]
        Upload upload = new Upload(inMemoryUploadHandler);
        // Take a photo with the back camera
        upload.setAcceptedMimeTypes("image/*");
        upload.setCapture(UploadCapture.ENVIRONMENT);
        // end::snippet[]

        add(upload);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<UploadMediaCapture> { // hidden-source-line
    } // hidden-source-line
}
