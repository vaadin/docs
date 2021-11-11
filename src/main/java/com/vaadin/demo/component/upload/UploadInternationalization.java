package com.vaadin.demo.component.upload;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MultiFileMemoryBuffer;
import com.vaadin.flow.router.Route;

@Route("upload-internationalization")
public class UploadInternationalization extends Div {

    public UploadInternationalization() {
        MultiFileMemoryBuffer buffer = new MultiFileMemoryBuffer();
        // tag::snippet[]
        Upload upload = new Upload(buffer);

        // Please see the separate UploadFinnishI18N class / file
        // in this example for the I18N configuration
        UploadFinnishI18N i18N = new UploadFinnishI18N();
        upload.setI18n(i18N);
        // end::snippet[]

        add(upload);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<UploadInternationalization> { // hidden-source-line
    } // hidden-source-line
}
