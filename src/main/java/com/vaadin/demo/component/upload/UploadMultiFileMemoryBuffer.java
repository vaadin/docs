package com.vaadin.demo.component.upload;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import com.vaadin.flow.component.upload.receivers.MultiFileMemoryBuffer;

import java.io.InputStream;

public class UploadMultiFileMemoryBuffer extends Div {
    public UploadMultiFileMemoryBuffer() {
        // tag::snippet[]
        MultiFileMemoryBuffer memoryBuffer = new MultiFileMemoryBuffer();
        Upload upload = new Upload(memoryBuffer);

        upload.addSucceededListener(event -> {
            String fileName = event.getFileName();

            // Get input stream specifically for the finished file
            InputStream fileData = memoryBuffer.getInputStream(fileName);
            long contentLength = event.getContentLength();
            String mimeType = event.getMIMEType();

            // Do something with the uploaded file
            // processFile(fileData, fileName, contentLength, mimeType);
        });
        // end::snippet[]
    }
}
