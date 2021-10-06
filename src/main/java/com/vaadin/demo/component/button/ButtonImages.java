package com.vaadin.demo.component.button;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("button-images")
public class ButtonImages extends Div {
    public ButtonImages() {
        StreamResource src = new StreamResource(
                "vaadin-logo-dark.png",
                () -> getClass().getResourceAsStream("/images/vaadin-logo-dark.png"));
        // tag::snippet[]
        Image img = new Image(src, "Vaadin logo");
        img.setWidth("100px");

        Button imgButton = new Button(img);
        imgButton.addThemeVariants(ButtonVariant.LUMO_ICON);
        // end::snippet[]

        add(imgButton);
    }

    public static class Exporter extends DemoExporter<ButtonImages> { // hidden-source-line
    } // hidden-source-line
}