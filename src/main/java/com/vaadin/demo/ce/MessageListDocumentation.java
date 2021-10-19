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

    // tag::message-list-ctor-persister[]
    CollaborationMessageList createWithPersister(MyMessagePersister persister) {
        return new CollaborationMessageList(userInfo, "general", persister);
    }
    // end::message-list-ctor-persister[]

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

    private void messageConfigurator() {
        UserInfo localUser = this.userInfo;
        // tag::message-list-configurator[]
        CollaborationMessageList collaborationMessageList =
                new CollaborationMessageList(userInfo, topicId);
        // tag::message-list-configurator-style[]
        collaborationMessageList.setMessageConfigurator((message, user) -> {
            if (user.equals(localUser)) {
                message.addThemeNames("current-user");
            }
        });
        // end::message-list-configurator-style[]
        // tag::message-list-configurator-censor[]
        collaborationMessageList.setMessageConfigurator((message, user) -> {
            // Example: Replace all occurrences of "badword" with "***"
            String censored = message.getText().replaceAll("badword", "***");
            message.setText(censored);
        });
        // end::message-list-configurator-censor[]
        // end::message-list-configurator[]
    }

}
