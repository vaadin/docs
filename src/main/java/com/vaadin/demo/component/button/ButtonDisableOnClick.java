package com.vaadin.demo.component.button;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.shared.DisableOnClickMode;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("button-disable-on-click")
public class ButtonDisableOnClick extends Div {
    public ButtonDisableOnClick() {
        // tag::snippet[]
        Button button = new Button("Save");
        button.setDisableOnClick(DisableOnClickMode.UNTIL_RESPONSE);
        button.addClickListener(event -> {
            // Simulate a slow operation
            try {
                Thread.sleep(1500);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            Notification.show("Saved");
        });
        // end::snippet[]

        add(button);
    }

    public static class Exporter extends DemoExporter<ButtonDisableOnClick> { // hidden-source-line
    } // hidden-source-line
}
