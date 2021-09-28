package com.vaadin.demo.ce;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.vaadin.collaborationengine.CollaborationEngine;

public class MyServlet extends HttpServlet {
    @Override
    // tag::snippet[]
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        CollaborationEngine ce = (CollaborationEngine) getServletContext()
                .getAttribute(CollaborationEngine.class.getName());
        if (ce == null) {
            resp.sendError(500, "Collaboration Engine has not yet been initialized");
            return;
        }
        // Do something with the CollaborationEngine instance
    }
    // end::snippet[]
}
