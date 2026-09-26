package com.vaadin.demo.component.messages;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.messages.MessageList;
import com.vaadin.flow.component.messages.MessageListItem;
import com.vaadin.flow.component.messages.MessageListTypingIndicatorType;
import com.vaadin.flow.component.messages.MessageListUser;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.router.Route;

@Route("message-list-typing-indicator")
public class MessageListTypingIndicator extends Div {

    public MessageListTypingIndicator() {
        Person person = DataService.getPeople(1).get(0);
        Instant fiveMinsAgo = Instant.now().minus(5, ChronoUnit.MINUTES);
        MessageListItem message = new MessageListItem(
                "Linsey, could you check if the details with the order are okay?",
                fiveMinsAgo, "Matt Mambo");
        message.setUserColorIndex(1);

        RadioButtonGroup<MessageListTypingIndicatorType> typeGroup = new RadioButtonGroup<>(
                "Typing indicator type",
                MessageListTypingIndicatorType.values());
        typeGroup.setItemLabelGenerator(type -> switch (type) {
        case DEFAULT -> "Default";
        case ELLIPSIS -> "Ellipsis";
        case MINIMAL -> "Minimal";
        });
        typeGroup.setValue(MessageListTypingIndicatorType.DEFAULT);

        // tag::snippet[]
        MessageList list = new MessageList(message);

        MessageListUser linsey = new MessageListUser("Linsey Listy",
                person.getPictureUrl());
        linsey.setColorIndex(2);
        MessageListUser sam = new MessageListUser("Sam Swanson");
        sam.setColorIndex(3);
        list.setTypingUsers(linsey, sam);

        // Change the type of the typing indicator when the option changes
        typeGroup.addValueChangeListener(
                event -> list.setTypingIndicatorType(event.getValue()));
        // end::snippet[]

        add(list, typeGroup);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<MessageListTypingIndicator> { // hidden-source-line
    } // hidden-source-line
}
