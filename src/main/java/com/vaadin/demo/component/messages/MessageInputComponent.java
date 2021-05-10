package com.vaadin.demo.component.messages;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.messages.MessageInput;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.router.Route;

@Route("message-input")
public class MessageInputComponent extends Div {

    public MessageInputComponent() {
        // tag::snippet[]
        MessageInput input = new MessageInput();
        input.addSubmitListener(submitEvent -> {
            Notification.show("Message received: " + submitEvent.getValue(),
                    3000, Notification.Position.MIDDLE);
        });
        add(input);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<MessageInputComponent> { // hidden-source-line
    } // hidden-source-line
}
