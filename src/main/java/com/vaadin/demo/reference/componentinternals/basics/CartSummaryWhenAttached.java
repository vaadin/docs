package com.vaadin.demo.reference.componentinternals.basics;

import java.util.EventObject;
import java.util.function.Consumer;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;

@Tag("div")
public class CartSummaryWhenAttached extends Component {

    public CartSummaryWhenAttached() {
        whenAttached(ui -> {
            // This assumes the session already contains a ShopEventBus
            var eventBus = ui.getSession().getAttribute(ShopEventBus.class);
            Consumer<EventObject> handler = this::onCartSummaryUpdate;
            eventBus.register(handler);

            return () -> eventBus.unregister(handler);
        });
    }

    private void onCartSummaryUpdate(EventObject event) {
        // update cart summary ...
    }
}
