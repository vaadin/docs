package com.vaadin.demo.component.upload;

import java.io.File;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.server.streams.FileUploadHandler;
import com.vaadin.flow.server.streams.UploadHandler;

public class UploadFileBuffer extends Div {
    public UploadFileBuffer() {
        // tag::snippet[]
        /* Example for FileBuffer */
        /* Handles both single and multifile upload */
        FileUploadHandler fileHandler = UploadHandler.toFile(
                (metadata, file) -> {
                    System.out.printf("File saved to: %s%n",
                            file.getAbsolutePath());
                }, metadata -> new File(System.getProperty("java.io.tmpdir"),
                        metadata.fileName()));
        Upload fileUpload = new Upload(fileHandler);
        // end::snippet[]

        add(fileUpload);
    }
}
