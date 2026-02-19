package com.vaadin.demo.reference.componentinternals.basics;

import com.vaadin.flow.component.orderedlayout.VerticalLayout;

public class SetIdView extends VerticalLayout {

    public SetIdView() {
        // tag::id[]
        var component = new ShoppingCartSummaryLabel();
        component.setId("my-component");
        // end::id[]
    }

}
