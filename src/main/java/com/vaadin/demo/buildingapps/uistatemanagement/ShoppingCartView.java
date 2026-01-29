package com.vaadin.demo.buildingapps.uistatemanagement;

import com.vaadin.flow.component.ComponentEffect;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.signals.Signal;
import com.vaadin.signals.local.ValueSignal;
import com.vaadin.signals.shared.SharedListSignal;
import com.vaadin.signals.shared.SharedValueSignal;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Route("shopping-cart")
public class ShoppingCartView extends VerticalLayout {

    public ShoppingCartView() {
        // tag::signals[]
        // State holders
        var cartItems = new SharedListSignal<>(CartItem.class);
        var shippingOption = new ValueSignal<>(ShippingOption.STANDARD);
        var discountCode = new ValueSignal<>("");

        // 1. Subtotal: Computed from cart items list
        var subtotal = Signal.computed(() ->
            cartItems.value().stream()
                .map(SharedValueSignal::value)
                .map(item -> item.product().price().multiply(BigDecimal.valueOf(item.quantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add)
        );

        // 2. Discount: Computed from subtotal and discount code
        var discount = Signal.computed(() -> {
            if ("SAVE10".equals(discountCode.value())) {
                return subtotal.value().multiply(new BigDecimal("0.10"))
                        .setScale(2, RoundingMode.HALF_UP);
            }
            return BigDecimal.ZERO;
        });

        // 3. Shipping: Computed from selected option
        var shipping = Signal.computed(() -> 
            shippingOption.value() == ShippingOption.EXPRESS ? 
                new BigDecimal("15.00") : new BigDecimal("5.00")
        );

        // 4. Total: Computed from other computed signals
        var total = Signal.computed(() ->
            subtotal.value().subtract(discount.value()).add(shipping.value())
        );
        // end::signals[]

        // tag::ui-binding[]
        // Bind inputs to signals
        ComboBox<ShippingOption> shippingSelect = new ComboBox<>("Shipping", ShippingOption.values());
        shippingSelect.bindValue(shippingOption);

        // Bind labels to computed signals
        Span totalLabel = new Span();
        totalLabel.bindText(total.map(v -> "Total: $" + v));

        // Dynamically render cart items
        Div cartContainer = new Div();
        ComponentEffect.bindChildren(cartContainer, cartItems, itemSignal -> {
            var item = itemSignal.value();
            return new Span(item.product().name() + " x" + item.quantity());
        });
        // end::ui-binding[]

        add(shippingSelect, cartContainer, totalLabel);
    }
}
