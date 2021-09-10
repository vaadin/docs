package com.vaadin.demo.ce;

import com.vaadin.collaborationengine.CollaborationMessage;
import com.vaadin.collaborationengine.MessageManager;
import com.vaadin.collaborationengine.UserInfo;
import com.vaadin.flow.component.messages.MessageInput;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;

/**
 * Code snippets used in MessageManager's reference documentation.
 */
public class MessageManagerExample extends VerticalLayout {

    public MessageManagerExample() {
        // tag::snippet[]
        UserInfo localUser = new UserInfo("john");
        String topicId = "notifications";

        MessageManager messageManager =
                new MessageManager(this, localUser, topicId); // <1>

        messageManager.setNewMessageHandler(context -> { // <2>
            CollaborationMessage message = context.getMessage();
            UserInfo user = message.getUser();
            String text = message.getText();

            Notification.show(user.getName() + ": " + text);
        });

        add(new MessageInput(event -> {
            String text = event.getValue();
            messageManager.submit(text); // <3>
        }));
        // end::snippet[]
    }

    // tag::persister[]
    MessageManager createManagerWithPersister(MyMessagePersister persister) {
        UserInfo localUser = new UserInfo("john");
        String topicId = "notifications";
        return new MessageManager(this, localUser, topicId, persister);
    }
    // end::persister[]
}
