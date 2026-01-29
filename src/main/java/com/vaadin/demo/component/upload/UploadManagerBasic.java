package com.vaadin.demo.component.upload;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.upload.UploadButton;
import com.vaadin.flow.component.upload.UploadFileList;
import com.vaadin.flow.component.upload.UploadManager;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.streams.UploadHandler;

@Route("upload-manager-basic")
public class UploadManagerBasic extends Div {

    public UploadManagerBasic() {
        // tag::snippet[]
        // Create the upload handler
        var handler = UploadHandler.inMemory((metadata, data) -> {
            // Process the uploaded file
            String fileName = metadata.fileName();
            String mimeType = metadata.contentType();
            // ...
        });

        // Create the manager with constraints
        var manager = new UploadManager(this, handler);
        manager.setMaxFiles(5);
        manager.setMaxFileSize(10 * 1024 * 1024); // 10 MB
        manager.setAcceptedFileTypes("image/*", "application/pdf");

        // Create the UI components
        var uploadButton = new UploadButton(manager);
        uploadButton.setText("Select Files");

        var fileList = new UploadFileList(manager);

        // Layout the components
        var layout = new VerticalLayout(uploadButton, fileList);
        layout.setPadding(false);
        layout.setSpacing(true);
        // end::snippet[]

        add(layout);
    }

    public static class Exporter extends DemoExporter<UploadManagerBasic> { // hidden-source-line
    } // hidden-source-line
}
