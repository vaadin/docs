package com.vaadin.demo.flow.advanced.eventbus;

import org.slf4j.LoggerFactory;

import com.vaadin.flow.server.ServiceInitEvent;
import com.vaadin.flow.server.SessionLockAcquiredEvent;
import com.vaadin.flow.server.SessionLockReleasedEvent;
import com.vaadin.flow.server.VaadinServiceEventBus;
import com.vaadin.flow.server.VaadinServiceInitListener;

// tag::snippet[]
public class SessionLockMetricsInitListener
        implements VaadinServiceInitListener {

    @Override
    public void serviceInit(ServiceInitEvent event) {
        VaadinServiceEventBus eventBus = event.getSource().getEventBus();

        eventBus.addListener(SessionLockAcquiredEvent.class,
                lockEvent -> LoggerFactory.getLogger(getClass()).debug(
                        "Session lock wait: {} ms",
                        lockEvent.getWaitTime().toMillis()));

        eventBus.addListener(SessionLockReleasedEvent.class,
                lockEvent -> LoggerFactory.getLogger(getClass()).debug(
                        "Session lock hold: {} ms",
                        lockEvent.getHoldTime().toMillis()));
    }
}
// end::snippet[]
