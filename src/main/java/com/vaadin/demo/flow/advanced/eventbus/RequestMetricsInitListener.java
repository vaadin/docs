package com.vaadin.demo.flow.advanced.eventbus;

import org.slf4j.LoggerFactory;

import com.vaadin.flow.server.RequestEndedEvent;
import com.vaadin.flow.server.ServiceInitEvent;
import com.vaadin.flow.server.VaadinServiceEventBus;
import com.vaadin.flow.server.VaadinServiceInitListener;

// tag::snippet[]
public class RequestMetricsInitListener implements VaadinServiceInitListener {

    @Override
    public void serviceInit(ServiceInitEvent event) {
        VaadinServiceEventBus eventBus = event.getSource().getEventBus();

        eventBus.addListener(RequestEndedEvent.class, requestEvent -> {
            String handler = requestEvent.getHandler()
                    .map(h -> h.getClass().getSimpleName()).orElse("none");

            requestEvent.getFailure()
                    .ifPresent(failure -> LoggerFactory.getLogger(getClass())
                            .warn("Request failed in {}", handler, failure));

            long millis = requestEvent.getDuration().toMillis();
            if (millis > 1000) {
                LoggerFactory.getLogger(getClass()).debug(
                        "Slow request ({} ms) handled by {}", millis, handler);
            }
        });
    }
}
// end::snippet[]
