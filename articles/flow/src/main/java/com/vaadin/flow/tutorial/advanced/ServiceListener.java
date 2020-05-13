package com.vaadin.flow.tutorial.advanced;

import org.slf4j.LoggerFactory;

import com.vaadin.flow.server.ServiceInitEvent;
import com.vaadin.flow.server.VaadinServiceInitListener;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("advanced/tutorial-ui-init-listener.asciidoc")
public class ServiceListener implements VaadinServiceInitListener {

    @Override
    public void serviceInit(ServiceInitEvent event) {
        event.getSource().addUIInitListener(
                initEvent -> LoggerFactory.getLogger(getClass())
                        .info("A new UI has been initialized!"));
    }
}
