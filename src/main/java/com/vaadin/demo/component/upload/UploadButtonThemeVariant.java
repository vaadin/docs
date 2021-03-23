package com.vaadin.demo.component.upload;

import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.router.Route;

@Route("upload-button-theme-variant")
public class UploadButtonThemeVariant extends Div {

    public UploadButtonThemeVariant() {
        // tag::snippet[]
        Upload upload = new Upload();
        add(upload);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<UploadButtonThemeVariant> { // hidden-full-source-line
    } // hidden-full-source-line
}
