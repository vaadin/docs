package com.vaadin.demo.component.upload;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.NativeLabel;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MultiFileMemoryBuffer;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.streams.InMemoryUploadHandler;
import com.vaadin.flow.server.streams.UploadHandler;

@Route("upload-drag-and-drop")
public class UploadDragAndDrop extends Div {

    public UploadDragAndDrop() {

        InMemoryUploadHandler inMemoryHandler1 = UploadHandler.inMemory(
                (metadata, data) -> {});
        InMemoryUploadHandler inMemoryHandler2 = UploadHandler.inMemory(
                (metadata, data) -> {});

        // tag::snippet[]
        Upload dropEnabledUpload = new Upload(inMemoryHandler1);
        dropEnabledUpload.setDropAllowed(true);

        Upload dropDisabledUpload = new Upload(inMemoryHandler2);
        dropDisabledUpload.setDropAllowed(false);
        // end::snippet[]

        NativeLabel dropEnabledLabel = new NativeLabel("Drag and drop enabled");
        dropEnabledLabel.getStyle().set("font-weight", "600");
        dropEnabledUpload.setId("upload-drop-enabled");
        dropEnabledLabel.setFor(dropEnabledUpload.getId().get());

        NativeLabel dropDisabledLabel = new NativeLabel(
                "Drag and drop disabled");
        dropDisabledLabel.getStyle().set("font-weight", "600");
        dropDisabledUpload.setId("upload-drop-disabled");
        dropDisabledLabel.setFor(dropDisabledUpload.getId().get());

        Div leftSection = new Div(dropEnabledLabel, dropEnabledUpload);
        Div rightSection = new Div(dropDisabledLabel, dropDisabledUpload);

        FormLayout formLayout = new FormLayout(leftSection, rightSection);
        formLayout.setResponsiveSteps(new FormLayout.ResponsiveStep("0", 1),
                new FormLayout.ResponsiveStep("520px", 2));

        add(formLayout);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<UploadDragAndDrop> { // hidden-source-line
    } // hidden-source-line
}
