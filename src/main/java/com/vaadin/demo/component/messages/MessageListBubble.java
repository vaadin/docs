package com.vaadin.demo.component.messages;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.messages.MessageList;
import com.vaadin.flow.component.messages.MessageListItem;
import com.vaadin.flow.component.messages.MessageListItemVariant;
import com.vaadin.flow.component.messages.MessageListVariant;
import com.vaadin.flow.router.Route;

@Route("message-list-bubble")
public class MessageListBubble extends Div {

    public MessageListBubble() {
        Instant yesterday = Instant.now().minus(1, ChronoUnit.DAYS);
        Instant fiftyMinsAgo = Instant.now().minus(50, ChronoUnit.MINUTES);
        Instant fortyMinsAgo = Instant.now().minus(40, ChronoUnit.MINUTES);

        // tag::snippet[]
        MessageList list = new MessageList();
        list.addThemeVariants(MessageListVariant.BUBBLE);

        MessageListItem message1 = new MessageListItem(
                "Linsey, could you check if the details with the order are okay?",
                yesterday, "Matt Mambo");
        message1.setUserColorIndex(1);

        // A message sent by the current user
        MessageListItem message2 = new MessageListItem("All good. Ship it.",
                fiftyMinsAgo, "Linsey Listy");
        message2.setUserColorIndex(2);
        message2.addThemeVariants(MessageListItemVariant.SELF);

        MessageListItem message3 = new MessageListItem(
                "Great, the customer will be glad to hear that.", fortyMinsAgo,
                "Sam Swanson");
        message3.setUserColorIndex(3);

        list.setItems(message1, message2, message3);
        add(list);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<MessageListBubble> { // hidden-source-line
    } // hidden-source-line
}
