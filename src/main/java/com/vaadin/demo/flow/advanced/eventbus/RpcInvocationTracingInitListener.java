package com.vaadin.demo.flow.advanced.eventbus;

import org.slf4j.LoggerFactory;

import com.vaadin.flow.server.ServiceInitEvent;
import com.vaadin.flow.server.VaadinServiceEventBus;
import com.vaadin.flow.server.VaadinServiceInitListener;
import com.vaadin.flow.server.communication.RpcInvocationEndedEvent;
import com.vaadin.flow.server.communication.RpcInvocationFailedEvent;
import com.vaadin.flow.server.communication.RpcInvocationStartedEvent;

// tag::snippet[]
public class RpcInvocationTracingInitListener
        implements VaadinServiceInitListener {

    private final ThreadLocal<Long> startedAt = new ThreadLocal<>();

    @Override
    public void serviceInit(ServiceInitEvent event) {
        VaadinServiceEventBus eventBus = event.getSource().getEventBus();

        eventBus.addListener(RpcInvocationStartedEvent.class,
                rpcEvent -> startedAt.set(System.nanoTime()));

        eventBus.addListener(RpcInvocationFailedEvent.class,
                rpcEvent -> LoggerFactory.getLogger(getClass()).warn(
                        "RPC invocation failed: type={}, name={}",
                        rpcEvent.getType(), rpcEvent.getName(),
                        rpcEvent.getError()));

        eventBus.addListener(RpcInvocationEndedEvent.class, rpcEvent -> {
            long elapsedNanos = System.nanoTime() - startedAt.get();
            startedAt.remove();
            LoggerFactory.getLogger(getClass()).debug(
                    "RPC invocation: type={}, name={}, took {} ms",
                    rpcEvent.getType(), rpcEvent.getName(),
                    elapsedNanos / 1_000_000.0);
        });
    }
}
// end::snippet[]
