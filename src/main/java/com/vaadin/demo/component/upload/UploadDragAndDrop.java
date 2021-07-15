package com.vaadin.demo.component.upload;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MultiFileMemoryBuffer;
import com.vaadin.flow.router.Route;

@Route("upload-drag-and-drop")
public class UploadDragAndDrop extends Div {

    public UploadDragAndDrop() {
        MultiFileMemoryBuffer buffer1 = new MultiFileMemoryBuffer();
        MultiFileMemoryBuffer buffer2 = new MultiFileMemoryBuffer();

        // tag::snippet[]
        Upload dropEnabledUpload = new Upload(buffer1);
        dropEnabledUpload.setDropAllowed(true);

        Upload dropDisabledUpload = new Upload(buffer2);
        dropDisabledUpload.setDropAllowed(false);
        // end::snippet[]

        Label dropEnabledLabel = new Label("Drag and drop enabled");
        dropEnabledLabel.getStyle().set("font-weight", "600");
        dropEnabledUpload.setId("upload-drop-enabled");
        dropEnabledLabel.setFor(dropEnabledUpload.getId().get());

        Label dropDisabledLabel = new Label("Drag and drop disabled");
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
