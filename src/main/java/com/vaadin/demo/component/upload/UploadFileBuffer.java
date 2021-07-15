package com.vaadin.demo.component.upload;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.FileBuffer;
import com.vaadin.flow.component.upload.receivers.FileData;
import com.vaadin.flow.component.upload.receivers.MultiFileBuffer;

public class UploadFileBuffer extends Div {
    public UploadFileBuffer() {
        // tag::snippet[]
        /* Example for FileBuffer */
        FileBuffer fileBuffer = new FileBuffer();
        Upload singleFileUpload = new Upload(fileBuffer);

        singleFileUpload.addSucceededListener(event -> {
            // Get information about the file that was written to the file system
            FileData savedFileData = fileBuffer.getFileData();
            String absolutePath = savedFileData.getFile().getAbsolutePath();

            System.out.printf("File saved to: %s%n", absolutePath);
        });

        /* Example for MultiFileBuffer */
        MultiFileBuffer multiFileBuffer = new MultiFileBuffer();
        Upload multiFileUpload = new Upload(multiFileBuffer);

        multiFileUpload.addSucceededListener(event -> {
            // Determine which file was uploaded successfully
            String uploadFileName = event.getFileName();
            // Get information for that specific file
            FileData savedFileData = multiFileBuffer.getFileData(uploadFileName);
            String absolutePath = savedFileData.getFile().getAbsolutePath();

            System.out.printf("File saved to: %s%n", absolutePath);
        });
        // end::snippet[]

        add(singleFileUpload, multiFileUpload);
    }
}
