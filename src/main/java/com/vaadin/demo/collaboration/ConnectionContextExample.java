package com.vaadin.demo.collaboration;

import com.vaadin.collaborationengine.CollaborationEngine;
import com.vaadin.collaborationengine.ComponentConnectionContext;
import com.vaadin.collaborationengine.ConnectionContext;
import com.vaadin.collaborationengine.MessageManager;
import com.vaadin.collaborationengine.PresenceManager;
import com.vaadin.collaborationengine.SystemConnectionContext;
import com.vaadin.collaborationengine.TopicConnection;
import com.vaadin.collaborationengine.TopicConnectionRegistration;
import com.vaadin.collaborationengine.UserInfo;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.function.SerializableFunction;
import com.vaadin.flow.shared.Registration;

import org.springframework.scheduling.annotation.Async;

public class ConnectionContextExample extends VerticalLayout {

    private UserInfo localUser = new UserInfo("userId");
    private String topicId = "mytopic";
    private MessageManager messageManager;
    private PresenceManager presenceManager;
    private TopicConnectionRegistration registration;
    private SerializableFunction<TopicConnection, Registration> connectionActivationCallback = connection -> {
        // Do something when the connection is active.
        return () -> {
            // cleanup
        };
    };

    public void instantiateWithConnectionContext(
            ConnectionContext connectionContext) {
        // tag::pass-a-connection-context[]
        // Use to create a message manager
        messageManager = new MessageManager(connectionContext, localUser,
                topicId, CollaborationEngine::getInstance);

        // Use to open a topic connection
        registration = CollaborationEngine.getInstance().openTopicConnection(
                connectionContext, topicId, localUser,
                connectionActivationCallback);
        // end::pass-a-connection-context[]
    }

    public void instantiateWithComponent() {
        // tag::component[]
        // The ComponentConnectionContext is implicitly created
        // when passing a component (this) as the first argument.
        messageManager = new MessageManager(this, localUser, topicId);
        presenceManager = new PresenceManager(this, localUser, topicId);
        registration = CollaborationEngine.getInstance().openTopicConnection(this, topicId,
                localUser, connectionActivationCallback);
        // end::component[]
    }

    public void instantiateWithComponentContext() {
        // tag::component-context[]
        ComponentConnectionContext context = new ComponentConnectionContext(
                this);

        // In this case the CollaborationEngine instance
        // also needs to be supplied.
        messageManager = new MessageManager(context, localUser, topicId,
                CollaborationEngine::getInstance);

        registration = CollaborationEngine.getInstance().openTopicConnection(context, topicId,
                localUser, connectionActivationCallback);
        // end::component-context[]
    }

    // tag::async-task[]
    @Async
    public void runAsynchronously(CollaborationEngine collaborationEngine) { // <1>
        UserInfo systemUser = new UserInfo("system user");

        ConnectionContext context = collaborationEngine.getSystemContext(); // <2>

        MessageManager messageManager = new MessageManager(context, systemUser,
                topicId, () -> collaborationEngine); // <3>

        messageManager.submit("The system is shutting down")
                .whenComplete((v, t) -> messageManager.close()); // <4>

    }
    // end::async-task[]

    public SystemConnectionContext getSystemConnectionContext(
            CollaborationEngine collaborationEngine) {

        // tag::system-connection-context[]
        SystemConnectionContext context = collaborationEngine
                .getSystemContext();
        // end::system-connection-context[]
        return context;
    }

    public void close() {
        messageManager.close();
        presenceManager.close();
        registration.remove();
    }
}
