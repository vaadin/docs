package com.vaadin.demo.component.upload;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MultiFileMemoryBuffer;
import com.vaadin.flow.router.Route;

import java.io.InputStream;

@Route("upload-basic")
public class UploadBasic extends Div {

    public UploadBasic() {
        // tag::snippet[]
        MultiFileMemoryBuffer buffer = new MultiFileMemoryBuffer();
        Upload upload = new Upload(buffer);

        upload.addSucceededListener(event -> {
            String fileName = event.getFileName();
            InputStream inputStream = buffer.getInputStream(fileName);

            // Do something with the file data
            // processFile(inputStream, fileName);
        });
        // end::snippet[]

        upload.getElement().executeJs("this.files = this.createFakeFilesUploadBasic()"); // hidden-source-line

        add(upload);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<UploadBasic> { // hidden-source-line
    } // hidden-source-line
}
