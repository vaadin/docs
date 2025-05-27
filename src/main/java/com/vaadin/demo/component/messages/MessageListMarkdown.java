package com.vaadin.demo.component.messages;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.messages.MessageList;
import com.vaadin.flow.component.messages.MessageListItem;
import com.vaadin.flow.router.Route;

@Route("message-list-markdown")
public class MessageListMarkdown extends Div {

    public MessageListMarkdown() {
        // tag::snippet[]
        MessageList list = new MessageList();
        list.setItems(new MessageListItem(
                "**Hello team!** Did everyone review the *design document* for the new project?",
                "Alex Johnson"),
                new MessageListItem(
                        """
                                ## Project Update
                                I've completed the initial research phase and documented my findings.

                                * UI mockups ✅
                                * Market analysis ✅
                                * [See detailed report](https://vaadin.com)

                                Let me know your thoughts!
                                """,
                        "Sam Rivera"));
        list.setMarkdown(true);
        // end::snippet[]

        add(list);
    }

    public static class Exporter extends DemoExporter<MessageListMarkdown> { // hidden-source-line
    } // hidden-source-line
}
