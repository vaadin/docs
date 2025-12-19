package com.vaadin.demo.reference.componentinternals.basics;

import java.util.EventObject;
import java.util.function.Consumer;

import com.vaadin.flow.component.AttachEvent;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.DetachEvent;
import com.vaadin.flow.component.Tag;

@Tag("div")
public class ShoppingCartSummaryLabel extends Component {

    private final Consumer<EventObject> eventHandler = this::onCartSummaryUpdate;

    @Override
    protected void onAttach(AttachEvent attachEvent) {
        // This assumes the session already contains a ShopEventBus
        var eventBus = attachEvent.getSession().getAttribute(ShopEventBus.class);
        eventBus.register(eventHandler);
    }

    @Override
    protected void onDetach(DetachEvent detachEvent) {
        var eventBus = detachEvent.getSession().getAttribute(ShopEventBus.class);
        eventBus.unregister(eventHandler);
    }

    private void onCartSummaryUpdate(EventObject event) {
        // update cart summary ...
    }
}

interface ShopEventBus {
    void register(Consumer<EventObject> eventHandler);

    void unregister(Consumer<EventObject> eventHandler);
}
