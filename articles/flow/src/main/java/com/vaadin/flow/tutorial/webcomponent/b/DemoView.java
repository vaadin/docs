package com.vaadin.flow.tutorial.webcomponent.b;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.Notification.Position;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("web-components/creating-java-api-for-a-web-component.asciidoc")
// @formatter:off
public class DemoView extends VerticalLayout {
    public DemoView() {
        PaperSlider paperSlider = new PaperSlider();
        paperSlider.setPin(true);
        paperSlider.addValueChangeListener(e -> {
            String message = "The value is now " + e.getValue();
            if (e.isFromClient()) {
                message += " (set by the user)";
            }
            Notification.show(message, 3000, Position.MIDDLE);
        });
        add(paperSlider);
        paperSlider.addClickListener(e -> {
            Notification.show("Clicked at " + e.getX() + "," + e.getY(), 1000, Position.BOTTOM_START);
        });

        Button incrementButton = new Button("Increment using setValue", e -> {
            paperSlider.setValue(paperSlider.getValue() + 5);
        });
        add(incrementButton);

        Button incrementJSButton = new Button("Increment using JS", e -> {
            paperSlider.increment();
        });
        add(incrementJSButton);

    }

}
