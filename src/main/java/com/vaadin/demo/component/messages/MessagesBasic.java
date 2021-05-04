package com.vaadin.demo.component.messages;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.vaadin.demo.DemoExporter;
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.messages.MessageInput;
import com.vaadin.flow.component.messages.MessageList;
import com.vaadin.flow.component.messages.MessageListItem;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("messages-basic")
public class MessagesBasic extends Div {

    public MessagesBasic() {
        // tag::snippet[]
        MessageList list = new MessageList();
        MessageInput input = new MessageInput();
        input.addSubmitListener(submitEvent -> {
            MessageListItem newMessage = new MessageListItem(
                    submitEvent.getValue(), Instant.now(), "Milla Sting");
            newMessage.setUserColorIndex(3);
            List<MessageListItem> items = new ArrayList<>(list.getItems());
            items.add(newMessage);
            list.setItems(items);
        });

        Person person = DataService.getPeople(1).get(0);
        MessageListItem message1 = new MessageListItem(
                "Nature does not hurry, yet everything gets accomplished.",
                LocalDateTime.now().minusDays(1).toInstant(ZoneOffset.UTC),
                "Matt Mambo");
        message1.setUserColorIndex(1);
        MessageListItem message2 = new MessageListItem(
                "Using your talent, hobby or profession in a way that makes you contribute with something good to this world is truly the way to go.",
                LocalDateTime.now().minusMinutes(55).toInstant(ZoneOffset.UTC),
                "Linsey Listy", person.getPictureUrl());
        message2.setUserColorIndex(2);
        list.setItems(message1, message2);

        VerticalLayout chatLayout = new VerticalLayout(list, input);
        chatLayout.setHeight("500px");
        chatLayout.setWidth("400px");
        chatLayout.expand(list);
        add(chatLayout);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<MessagesBasic> { // hidden-source-line
    } // hidden-source-line
}
