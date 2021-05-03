package com.vaadin.demo.flow.application.resources;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.router.Route;

@Route("application-images-basic")
public class ImageBasic extends Div {
    private static final long serialVersionUID = 1L;

    public ImageBasic() {
        // tag::snippet[]
        Image image = new Image("images/myimage.png", "My Alt Image");
        add(image);
        // end::snippet[]
    }

    public static class ImageBasicExporter extends DemoExporter<ImageBasic> { // hidden-source-line
    } // hidden-source-line    
}
