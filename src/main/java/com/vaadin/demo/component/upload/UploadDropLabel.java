package com.vaadin.demo.component.upload;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.html.AnchorTarget;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MultiFileMemoryBuffer;
import com.vaadin.flow.router.Route;

@Route("upload-drop-label")
public class UploadDropLabel extends Div {

    public UploadDropLabel() {
        MultiFileMemoryBuffer buffer = new MultiFileMemoryBuffer();
        // tag::snippet[]
        Upload upload = new Upload(buffer);

        Span dropLabel = createDropLabel();
        Icon dropIcon = VaadinIcon.CLOUD_UPLOAD_O.create();

        upload.setDropLabel(dropLabel);
        upload.setDropLabelIcon(dropIcon);
        // end::snippet[]

        add(upload);
    }

    private static Span createDropLabel() {
        Span cloudHint = new Span(
                "Files will be uploaded to our cloud. Please note our ");
        Anchor policyLink = new Anchor(
                "https://vaadin.com/privacy-policy",
                "privacy policy", AnchorTarget.BLANK
        );

        return new Span(cloudHint, policyLink);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<UploadDropLabel> { // hidden-source-line
    } // hidden-source-line
}
