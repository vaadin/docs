package com.vaadin.demo.ce;

import com.vaadin.collaborationengine.CollaborationEngine;
import com.vaadin.collaborationengine.MessageManager;
import com.vaadin.collaborationengine.SystemConnectionContext;
import com.vaadin.collaborationengine.UserInfo;
import com.vaadin.flow.component.html.Div;

public class ConnectionContextExample extends Div {

    private static final UserInfo systemUser = new UserInfo("system");
    private static final String topicId = "topic";

    // tag::snippet[]
    public void createAsyncJob() {
        CollaborationEngine collaborationEngine = CollaborationEngine.getInstance();
        Thread thread = new Thread(() -> {
            // Query API
            Object result = queryAPI();
            // Get SystemConnectionContext from Collaboration Engine
            SystemConnectionContext systemConnectionContext =
                collaborationEngine.getSystemContext();
            // Notify the topic
            MessageManager messageManager =
                new MessageManager(systemConnectionContext, systemUser, topicId,
                    collaborationEngine);
            messageManager
                .submit(result.toString())
                .whenComplete((a, t) -> {
                    // Close the message manager when done
                    messageManager.close();
            });
        });
        thread.setDaemon(true);
        thread.start();
    }
    // end::snippet[]

    private Object queryAPI() {
        return new Object();
    }
}
