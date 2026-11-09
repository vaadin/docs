package com.vaadin.demo.component.htmlelements;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Input;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.Route;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("input-color")
public class InputColor extends Div {

    public InputColor() {
        // tag::snippet[]
        Input colorInput = new Input(ValueChangeMode.ON_CHANGE);
        colorInput.setType("color");
        colorInput.setAriaLabel("Highlight color");
        colorInput.setValue("#ff8800");
        colorInput.addValueChangeListener(
                event -> Notification.show("Picked " + event.getValue()));
        // end::snippet[]

        add(colorInput);
    }

    public static class Exporter extends DemoExporter<InputColor> { // hidden-source-line
    } // hidden-source-line
}
