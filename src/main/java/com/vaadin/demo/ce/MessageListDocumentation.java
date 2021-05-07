package com.vaadin.demo.ce;

import com.vaadin.collaborationengine.CollaborationMessageInput;
import com.vaadin.collaborationengine.CollaborationMessageList;
import com.vaadin.collaborationengine.UserInfo;
import com.vaadin.demo.domain.MessageService;
import com.vaadin.demo.domain.User;
import com.vaadin.demo.domain.User.UserService;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.shared.Registration;

/**
 * Code snippets used in CollaborationMessageList's reference documentation.
 */
public class MessageListDocumentation extends VerticalLayout {

    private CollaborationMessageList messageList;
    private UserInfo userInfo;
    private String topicId;

    private UserService userService;

    private MessageService messageService;

    private MyMessagePersister myMessagePersister;

    public MessageListDocumentation() {
        // tag::message-list-and-input[]
        User userEntity = userService.getCurrentUser();
        UserInfo userInfo = new UserInfo(userEntity.getId(),
                userEntity.getName(), userEntity.getImageUrl());
        String topicId = "general";

        CollaborationMessageList messageList = new CollaborationMessageList(
                userInfo, topicId);
        CollaborationMessageInput messageInput = new CollaborationMessageInput(
                messageList);
        // end::message-list-and-input[]
        // tag::message-list-layout[]
        VerticalLayout chatLayout = new VerticalLayout(messageList,
                messageInput);
        chatLayout.setHeight("500px");
        chatLayout.setWidth("400px");
        chatLayout.expand(messageList);
        messageInput.setWidthFull();
        add(chatLayout);
        // end::message-list-layout[]
    }

    private void setPersister() {
        // tag::message-list-ctor-persister[]
        CollaborationMessageList messageList = new CollaborationMessageList(
                userInfo, "general", myMessagePersister);
        // end::message-list-ctor-persister[]
    }

    private void customSubmitter() {
        // tag::message-list-submitter[]
        TextField field = new TextField("Message");
        Button button = new Button("Submit");
        button.setEnabled(false);

        messageList.setSubmitter(activationContext -> {
            button.setEnabled(true);
            Registration registration = button.addClickListener(
                    event -> activationContext.appendMessage(field.getValue()));
            return () -> {
                registration.remove();
                button.setEnabled(false);
            };
        });
        // end::message-list-submitter[]
    }
}
