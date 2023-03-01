package com.vaadin.demo.fusion.reactive;

import java.time.Duration;
import java.util.Date;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.EndpointSubscription;
import dev.hilla.Nonnull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import reactor.core.publisher.Flux;

@Endpoint
public class ReactiveEndpoint {

    private static final Logger LOGGER = LoggerFactory.getLogger(ReactiveEndpoint.class);

    // tag::snippet[]
    @AnonymousAllowed
    public Flux<@Nonnull String> getClock() {
        return Flux.interval(Duration.ofSeconds(1))
                .onBackpressureDrop()
                .map(_interval -> new Date().toString());
    }

    @AnonymousAllowed
    public EndpointSubscription<@Nonnull String> getClockCancellable() {
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
