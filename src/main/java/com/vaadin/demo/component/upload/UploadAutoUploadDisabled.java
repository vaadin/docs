package com.vaadin.demo.component.upload;

import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.router.Route;

@Route("upload-auto-upload-disabled")
public class UploadAutoUploadDisabled extends Div {

    public UploadAutoUploadDisabled() {
        // tag::snippet[]
        Upload upload = new Upload();
        add(upload);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<UploadAutoUploadDisabled> { // hidden-full-source-line
    } // hidden-full-source-line
}
