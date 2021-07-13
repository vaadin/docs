package com.vaadin.demo.component.upload;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import com.vaadin.flow.router.Route;

import java.io.InputStream;

@Route("upload-basic")
public class UploadBasic extends Div {

    public UploadBasic() {
        // tag::snippet[]
        MemoryBuffer buffer = new MemoryBuffer();
        Upload upload = new Upload(buffer);

        upload.addSucceededListener(event -> {
            String fileName = buffer.getFileName();
            InputStream inputStream = buffer.getInputStream();

            // Do something with the file data
            // processFile(inputStream, fileName);
        });
        // end::snippet[]

        add(upload);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<UploadBasic> { // hidden-source-line
    } // hidden-source-line
}
