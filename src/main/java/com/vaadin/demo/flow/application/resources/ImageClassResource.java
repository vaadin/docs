package com.vaadin.demo.flow.application.resources;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.StreamResource;

@Route("application-images-class")
public class ImageClassResource extends Div {
    private static final long serialVersionUID = 1L;

    public ImageClassResource() {
        // tag::snippet[]
        StreamResource imageResource = new StreamResource("myimage.png",
            () -> getClass().getResourceAsStream("/images/myimage.png"));

        Image image = new Image(imageResource, "My Streamed Image");
        add(image);
        // end::snippet[]
    }

    public static class ImageClassResourceExporter extends DemoExporter<ImageClassResource> { // hidden-source-line
    } // hidden-source-line    
}
