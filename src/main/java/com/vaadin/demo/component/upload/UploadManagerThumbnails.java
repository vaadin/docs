package com.vaadin.demo.component.upload;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.upload.UploadButton;
import com.vaadin.flow.component.upload.UploadFileList;
import com.vaadin.flow.component.upload.UploadFileListVariant;
import com.vaadin.flow.component.upload.UploadManager;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.streams.UploadHandler;

@Route("upload-manager-thumbnails")
public class UploadManagerThumbnails extends Div {

    public UploadManagerThumbnails() {
        // tag::snippet[]
        var handler = UploadHandler.inMemory((metadata, data) -> {
            // Process the uploaded image
        });

        var manager = new UploadManager(this, handler);

        var uploadButton = new UploadButton("Select Files", manager);

        var fileList = new UploadFileList(manager);
        fileList.setWidthFull();
        fileList.addThemeVariants(UploadFileListVariant.THUMBNAILS);

        var layout = new VerticalLayout(uploadButton, fileList);
        layout.setPadding(false);
        layout.setSpacing(true);
        // end::snippet[]

        add(layout);
    }

    public static class Exporter extends DemoExporter<UploadManagerThumbnails> { // hidden-source-line
    } // hidden-source-line
}
