package com.vaadin.flow.tutorial.embeddingflowapplications;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.SessionTrackingMode;
import javax.servlet.annotation.WebListener;

import java.util.EnumSet;

import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("embedding-flow-applications/tutorial-webcomponent-intro.asciidoc")
@WebListener
public class SessionTrackingModeListener implements ServletContextListener {

    @Override
    public void contextDestroyed(ServletContextEvent event) {
    }

    @Override
    public void contextInitialized(ServletContextEvent event) {
        ServletContext context = event.getServletContext();
        EnumSet<SessionTrackingMode> modes = EnumSet
                .of(SessionTrackingMode.SSL);

        context.setSessionTrackingModes(modes);
    }

}
