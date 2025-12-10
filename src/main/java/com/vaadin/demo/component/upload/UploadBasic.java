package com.vaadin.demo.component.upload;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MultiFileMemoryBuffer;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.streams.InMemoryUploadHandler;
import com.vaadin.flow.server.streams.UploadHandler;

import java.io.InputStream;

@Route("upload-basic")
public class UploadBasic extends Div {

    public UploadBasic() {
        // tag::snippet[]
        InMemoryUploadHandler inMemoryHandler = UploadHandler
                .inMemory((metadata, data) -> {
                    // Get other information about the file.
                    String fileName = metadata.fileName();
                    String mimeType = metadata.contentType();
                    long contentLength = metadata.contentLength();

                    // Do something with the file data...
                    // processFile(data, fileName);
                });
        Upload upload = new Upload(inMemoryHandler);
        // end::snippet[]

        upload.getElement() // hidden-source-line
                .executeJs("this.files = this.createFakeFilesUploadBasic()"); // hidden-source-line

        add(upload);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<UploadBasic> { // hidden-source-line
    } // hidden-source-line
}
