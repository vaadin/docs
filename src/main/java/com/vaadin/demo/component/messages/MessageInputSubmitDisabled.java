package com.vaadin.demo.component.messages;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.messages.MessageInput;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("message-input-submit-disabled")
public class MessageInputSubmitDisabled extends Div {

    public MessageInputSubmitDisabled() {
        // tag::snippet[]
        MessageInput input = new MessageInput();
        input.setSubmitDisabled(true);
        input.addSubmitListener(submitEvent -> {
            Notification.show("Message received: " + submitEvent.getValue(),
                    3000, Notification.Position.MIDDLE);
        });

        Checkbox checkbox = new Checkbox("Submit disabled", true);
        checkbox.addValueChangeListener(
                event -> input.setSubmitDisabled(event.getValue()));
        // end::snippet[]

        VerticalLayout layout = new VerticalLayout(input, checkbox);
        layout.setPadding(false);
        layout.setAlignItems(FlexComponent.Alignment.STRETCH);
        add(layout);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<MessageInputSubmitDisabled> { // hidden-source-line
    } // hidden-source-line
}
