package com.vaadin.demo.ce;

import javax.swing.JList;

import com.vaadin.collaborationengine.CollaborationAvatarGroup;
import com.vaadin.collaborationengine.CollaborationEngine;
import com.vaadin.collaborationengine.ComponentConnectionContext;
import com.vaadin.collaborationengine.ConnectionContext;
import com.vaadin.collaborationengine.MessageManager;
import com.vaadin.collaborationengine.PresenceManager;
import com.vaadin.collaborationengine.TopicConnection;
import com.vaadin.collaborationengine.TopicConnectionRegistration;
import com.vaadin.collaborationengine.UserInfo;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.function.SerializableFunction;
import com.vaadin.flow.shared.Registration;

import org.springframework.scheduling.annotation.Async;

public class ConnectionContextExample extends VerticalLayout {

    private UserInfo localUser = new UserInfo("userId");
    private String topicId = "mytopic";
    private CollaborationEngine collaborationEngine = CollaborationEngine.getInstance();
    private MessageManager messageManager;
    private PresenceManager presenceManager;
    private TopicConnectionRegistration registration;
    private SerializableFunction<TopicConnection, Registration> connectionActivationCallback = connection -> {
        // Do something when the connection is active.
        return () -> {
            // cleanup
        };
    };

    public void instantiateWithConnectionContext(ConnectionContext connectionContext) {
        // tag::pass-a-connection-context[]
        messageManager = new MessageManager(connectionContext, localUser, topicId, collaborationEngine);
        registration = collaborationEngine.openTopicConnection(connectionContext, topicId, localUser,
                connectionActivationCallback);
        // end::pass-a-connection-context[]
    }

    public void instantiateWithComponent() {
        // tag::component[]
        messageManager = new MessageManager(this, localUser, topicId);
        presenceManager = new PresenceManager(this, localUser, topicId);
        registration = collaborationEngine.openTopicConnection(this, topicId, localUser, connectionActivationCallback);
        // end::component[]
    }

    // tag::async-task[]
    @Async
    public void runAsynchronously(CollaborationEngine collaborationEngine) { // <1>
        // Would throw an exception in this case.
        // collaborationEngine = CollaborationEngine.getInstance(); 
        UserInfo systemUser = new UserInfo("system user");
        
        ConnectionContext context = collaborationEngine.getSystemContext(); // <2>

        MessageManager messageManager =
            new MessageManager(context, systemUser, topicId, collaborationEngine); // <3>

        messageManager
            .submit("The system is shutting down")
            .whenComplete((v,t) -> messageManager.close()); // <4>

    }
    // end::async-task[]

    public void close() {
        messageManager.close();
        presenceManager.close();
        registration.remove();
    }
}
