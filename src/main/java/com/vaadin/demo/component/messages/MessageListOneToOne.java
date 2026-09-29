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

@Route("message-list-one-to-one")
public class MessageListOneToOne extends Div {

    public MessageListOneToOne() {
        Instant fiveMinsAgo = Instant.now().minus(5, ChronoUnit.MINUTES);
        Instant fourMinsAgo = Instant.now().minus(4, ChronoUnit.MINUTES);

        // tag::snippet[]
        MessageList list = new MessageList();
        list.addThemeVariants(MessageListVariant.BUBBLE,
                MessageListVariant.ONE_TO_ONE);
        list.setMarkdown(true);

        MessageListItem prompt = new MessageListItem(
                "Which orders are still waiting for shipment?", fiveMinsAgo,
                "Linsey Listy");
        prompt.addThemeVariants(MessageListItemVariant.SELF);

        MessageListItem response = new MessageListItem(
                """
                        These orders are waiting for shipment:

                        - **#1042**, paid yesterday
                        - **#1043**, paid today
                        - **#1045**, waiting for stock

                        The first two can ship today. Order #1045 ships when the missing items arrive.
                        """,
                fourMinsAgo, "Assistant");
        response.addThemeVariants(MessageListItemVariant.FULL_WIDTH);

        list.setItems(prompt, response);
        add(list);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<MessageListOneToOne> { // hidden-source-line
    } // hidden-source-line
}
