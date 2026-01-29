package com.vaadin.demo.component.upload;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.upload.UploadButton;
import com.vaadin.flow.component.upload.UploadDropZone;
import com.vaadin.flow.component.upload.UploadFileList;
import com.vaadin.flow.component.upload.UploadManager;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.streams.UploadHandler;

@Route("upload-manager-drop-zone")
public class UploadManagerDropZone extends Div {

    public UploadManagerDropZone() {
        // tag::snippet[]
        // Create the upload handler
        var handler = UploadHandler.inMemory((metadata, data) -> {
            // Process the uploaded file
        });

        // Create the manager
        var manager = new UploadManager(this, handler);
        manager.setMaxFiles(10);
        manager.setAcceptedFileTypes("image/*");

        // Create the upload button
        var uploadButton = new UploadButton(manager);
        uploadButton.setText("Browse");

        // Create drop zone content
        var icon = VaadinIcon.UPLOAD.create();
        var label = new Span("Drop images here or");
        var dropContent = new HorizontalLayout(icon, label, uploadButton);
        dropContent.setAlignItems(FlexComponent.Alignment.CENTER);
        dropContent.setSpacing(true);

        // Create the drop zone with the content inside
        var dropZone = new UploadDropZone(manager);
        dropZone.add(dropContent);
        dropZone.getStyle()
                .set("border", "2px dashed var(--lumo-contrast-30pct)")
                .set("border-radius", "var(--lumo-border-radius-l)")
                .set("padding", "var(--lumo-space-l)")
                .set("display", "flex")
                .set("justify-content", "center");

        // Create the file list
        var fileList = new UploadFileList(manager);

        // Layout the components
        var layout = new VerticalLayout(dropZone, fileList);
        layout.setPadding(false);
        layout.setSpacing(true);
        // end::snippet[]

        add(layout);
    }

    public static class Exporter extends DemoExporter<UploadManagerDropZone> { // hidden-source-line
    } // hidden-source-line
}
