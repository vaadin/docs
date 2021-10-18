package com.vaadin.demo.ce;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.vaadin.collaborationengine.CollaborationEngine;
import com.vaadin.collaborationengine.MessageManager;
import com.vaadin.collaborationengine.SystemConnectionContext;
import com.vaadin.collaborationengine.UserInfo;

public class MyServlet extends HttpServlet {
    private final UserInfo systemUser = new UserInfo("system");
    private final String topicId = "topic";

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        // tag::get-ce[]
        CollaborationEngine ce = (CollaborationEngine) getServletContext()
                .getAttribute(CollaborationEngine.class.getName());
        // end::get-ce[]
        if (ce == null) {
            resp.sendError(500, "Collaboration Engine has not yet been initialized");
            return;
        }
        // Retrieve message that was sent in this POST request
        String message = req.getParameter("message");

        sendMessageToTopic(ce, message);
        resp.setStatus(202);
    }
    // tag::job[]
    public void sendMessageToTopic(CollaborationEngine ce, String message) {
            // Get SystemConnectionContext from Collaboration Engine
            SystemConnectionContext systemConnectionContext =
                ce.getSystemContext();

            MessageManager messageManager =
                new MessageManager(systemConnectionContext, systemUser, topicId,
                    ce);

            messageManager
                .submit(message) // Send message to topic
                .whenComplete((a, t) -> {
                    // Close the message manager when done
                    messageManager.close();
            });
    }
    // end::job[]

}
