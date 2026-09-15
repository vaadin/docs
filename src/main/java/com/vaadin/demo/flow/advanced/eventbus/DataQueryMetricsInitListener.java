package com.vaadin.demo.flow.advanced.eventbus;

import org.slf4j.LoggerFactory;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.server.ServiceInitEvent;
import com.vaadin.flow.server.VaadinServiceEventBus;
import com.vaadin.flow.server.VaadinServiceInitListener;
import com.vaadin.flow.server.data.AbstractDataFetchEvent;
import com.vaadin.flow.server.data.DataFetchEndedEvent;
import com.vaadin.flow.server.data.DataFetchFailedEvent;
import com.vaadin.flow.server.data.DataFetchStartedEvent;

// tag::snippet[]
public class DataQueryMetricsInitListener implements VaadinServiceInitListener {

    private static final long SLOW_FETCH_MS = 200;

    private final ThreadLocal<Long> startedAt = new ThreadLocal<>();

    @Override
    public void serviceInit(ServiceInitEvent event) {
        VaadinServiceEventBus eventBus = event.getSource().getEventBus();

        eventBus.addListener(DataFetchStartedEvent.class,
                fetchEvent -> startedAt.set(System.nanoTime()));

        eventBus.addListener(DataFetchFailedEvent.class,
                fetchEvent -> LoggerFactory.getLogger(getClass()).warn(
                        "Fetch failed for {}", describe(fetchEvent),
                        fetchEvent.getError()));

        eventBus.addListener(DataFetchEndedEvent.class, fetchEvent -> {
            long elapsedMs = (System.nanoTime() - startedAt.get()) / 1_000_000;
            startedAt.remove();
            if (elapsedMs >= SLOW_FETCH_MS) {
                LoggerFactory.getLogger(getClass()).warn(
                        "Slow fetch for {}: {} items in {} ms",
                        describe(fetchEvent), fetchEvent.getRowsReturned(),
                        elapsedMs);
            }
        });
    }

    private static String describe(AbstractDataFetchEvent event) {
        String component = event.getComponent().map(Component::getClass)
                .map(Class::getSimpleName).orElse("an unknown component");
        return "%s, items %d-%d%s".formatted(component, event.getOffset(),
                event.getOffset() + event.getLimit(),
                event.isFiltered() ? " (filtered)" : "");
    }
}
// end::snippet[]
