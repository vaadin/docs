package com.vaadin.demo.flow.application.resources;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.streams.DownloadHandler;

@Route("application-images-class")
public class ImageClassResource extends Div {
    private static final long serialVersionUID = 1L;

    public ImageClassResource() {
        // tag::snippet[]
        Image image = new Image(DownloadHandler.forClassResource(getClass(),"/images/myimage.png"), "My Streamed Image");
        add(image);
        // end::snippet[]
    }

    public static class ImageClassResourceExporter // hidden-source-line
            extends DemoExporter<ImageClassResource> { // hidden-source-line
    } // hidden-source-line
}
