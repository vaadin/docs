package com.vaadin.demo.reference.componentinternals.events.ui;

import com.vaadin.flow.component.ComponentUtil;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;

public class OrdersView extends VerticalLayout {

    public OrdersView() {
        whenAttached(ui -> ComponentUtil.addListener(ui, SearchEvent.class,
                event -> filterOrders(event.getQuery())));
    }

    private void filterOrders(String query) {
        // update the orders grid ...
    }
}
