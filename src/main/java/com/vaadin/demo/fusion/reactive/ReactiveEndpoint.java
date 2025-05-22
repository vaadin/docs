package com.vaadin.demo.fusion.reactive;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import com.vaadin.hilla.EndpointSubscription;
import org.jspecify.annotations.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.Date;

@Endpoint
public class ReactiveEndpoint {

    private static final Logger LOGGER = LoggerFactory
            .getLogger(ReactiveEndpoint.class);

    // tag::snippet[]
    @AnonymousAllowed
    public Flux<@NonNull String> getClock() {
        return Flux.interval(Duration.ofSeconds(1)).onBackpressureDrop()
                .map(_interval -> new Date().toString());
    }

    @AnonymousAllowed
    public EndpointSubscription<@NonNull String> getClockCancellable() {
        return EndpointSubscription.of(getClock(), () -> {
            LOGGER.info("Subscription has been cancelled");
        });
    }
    // end::snippet[]

    // Needed to avoid a TypeScript compilation error // hidden-source-line
    // See https://github.com/vaadin/hilla/issues/795 // hidden-source-line
    public void dummy() { // hidden-source-line
    } // hidden-source-line
}
