package com.vaadin.demo.component.upload;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;

import java.io.InputStream;

public class UploadMemoryBuffer extends Div {
    public UploadMemoryBuffer() {
        // tag::snippet[]
        MemoryBuffer memoryBuffer = new MemoryBuffer();
        Upload upload = new Upload(memoryBuffer);

        upload.addSucceededListener(event -> {
            InputStream fileData = memoryBuffer.getInputStream();
            String fileName = event.getFileName();
            long contentLength = event.getContentLength();
            String mimeType = event.getMIMEType();

            // Do something with the uploaded file
            // processFile(fileData, fileName, contentLength, mimeType);
        });
        // end::snippet[]
    }
}
