package com.vaadin.demo.flow.advanced.eventbus;

import org.slf4j.LoggerFactory;

import com.vaadin.flow.server.ServiceInitEvent;
import com.vaadin.flow.server.SessionLockAcquiredEvent;
import com.vaadin.flow.server.SessionLockReleasedEvent;
import com.vaadin.flow.server.SessionLockRequestedEvent;
import com.vaadin.flow.server.VaadinServiceEventBus;
import com.vaadin.flow.server.VaadinServiceInitListener;

// tag::snippet[]
public class SessionLockMetricsInitListener
        implements VaadinServiceInitListener {

    private final ThreadLocal<Long> requestedAt = new ThreadLocal<>();
    private final ThreadLocal<Long> acquiredAt = new ThreadLocal<>();

    @Override
    public void serviceInit(ServiceInitEvent event) {
        VaadinServiceEventBus eventBus = event.getSource().getEventBus();

        eventBus.addListener(SessionLockRequestedEvent.class,
                lockEvent -> requestedAt.set(System.nanoTime()));

        eventBus.addListener(SessionLockAcquiredEvent.class, lockEvent -> {
            long acquired = System.nanoTime();
            acquiredAt.set(acquired);
            LoggerFactory.getLogger(getClass()).debug(
                    "Session lock wait: {} ms",
                    (acquired - requestedAt.get()) / 1_000_000.0);
        });

        eventBus.addListener(SessionLockReleasedEvent.class, lockEvent -> {
            long holdNanos = System.nanoTime() - acquiredAt.get();
            LoggerFactory.getLogger(getClass())
                    .debug("Session lock hold: {} ms", holdNanos / 1_000_000.0);
            requestedAt.remove();
            acquiredAt.remove();
        });
    }
}
// end::snippet[]
