package com.vaadin.demo.ce;

import java.util.stream.Stream;

import com.vaadin.collaborationengine.CollaborationMessage;
import com.vaadin.collaborationengine.CollaborationMessagePersister;
import com.vaadin.collaborationengine.UserInfo;
import com.vaadin.demo.domain.Message;
import com.vaadin.demo.domain.MessageService;
import com.vaadin.demo.domain.User;
import com.vaadin.demo.domain.User.UserService;
import com.vaadin.flow.spring.annotation.SpringComponent;

// tag::message-list-persister[]
@SpringComponent
public class MyMessagePersister implements CollaborationMessagePersister {

    private final MessageService messageService;
    private final UserService userService;

    public MyMessagePersister(MessageService messageService,
            UserService userService) {
        this.messageService = messageService;
        this.userService = userService;
    }

    @Override
    public Stream<CollaborationMessage> fetchMessages(FetchQuery query) {
        return messageService
                .findAllByTopicSince(query.getTopicId(), query.getSince())
                .map(messageEntity -> {
                    User author = messageEntity.getAuthor();
                    UserInfo userInfo = new UserInfo(author.getId(),
                            author.getName(), author.getImageUrl());

                    return new CollaborationMessage(userInfo,
                            messageEntity.getText(), messageEntity.getTime());
                });
    }

    @Override
    public void persistMessage(PersistRequest request) {
        CollaborationMessage message = request.getMessage();

        Message messageEntity = new Message();
        messageEntity.setTopic(request.getTopicId());
        messageEntity.setText(message.getText());
        messageEntity
                .setAuthor(userService.findById(message.getUser().getId()));

        // Set the time from the message only as a fallback option if your
        // database can't automatically add an insertion timestamp:
        // messageEntity.setTime(message.getTime());

        messageService.save(messageEntity);
    }
}
// end::message-list-persister[]
