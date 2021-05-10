package com.vaadin.demo.component.messages;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Arrays;

import com.vaadin.demo.DemoExporter;
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.messages.MessageList;
import com.vaadin.flow.component.messages.MessageListItem;
import com.vaadin.flow.router.Route;

@Route("message-list")
public class MessageListComponent extends Div {

    public MessageListComponent() {
        // tag::snippet[]
        Person person = DataService.getPeople(1).get(0);
        MessageList list = new MessageList();
        Instant yesterday = LocalDateTime.now().minusDays(1)
                .toInstant(ZoneOffset.UTC);
        Instant fiftyMinsAgo = LocalDateTime.now().minusMinutes(50)
                .toInstant(ZoneOffset.UTC);
        MessageListItem message1 = new MessageListItem(
                "Linsey, could you check if the details with the order are okay?",
                yesterday, "Matt Mambo");
        message1.setUserColorIndex(1);
        MessageListItem message2 = new MessageListItem("All good. Ship it.",
                fiftyMinsAgo, "Linsey Listy", person.getPictureUrl());
        message2.setUserColorIndex(2);
        list.setItems(Arrays.asList(message1, message2));
        add(list);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<MessageListComponent> { // hidden-source-line
    } // hidden-source-line
}
