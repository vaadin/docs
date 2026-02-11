package com.vaadin.demo.flow.signals;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import com.vaadin.flow.component.ComponentEffect;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.IntegerField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.signals.Signal;
import com.vaadin.flow.signals.WritableSignal;
import com.vaadin.flow.signals.local.ListSignal;
import com.vaadin.flow.signals.local.ValueSignal;

public class ShoppingCartSignals extends VerticalLayout {

    record Product(String id, String name, BigDecimal price) {}
    record CartItem(Product product, int quantity) {
        CartItem withQuantity(int newQuantity) {
            return new CartItem(this.product, newQuantity);
        }
    }
    record DiscountCode(String code, BigDecimal percentage) {}
    enum ShippingOption { STANDARD, EXPRESS, OVERNIGHT }

    public ShoppingCartSignals() {
        // tag::signals[]
        // Create signals for cart state
        ListSignal<CartItem> cartItemsSignal = new ListSignal<>();
        ValueSignal<String> discountCodeSignal = new ValueSignal<>("");
        ValueSignal<ShippingOption> shippingOptionSignal = new ValueSignal<>(ShippingOption.STANDARD);
        // end::signals[]

        // tag::computed-subtotal[]
        // Computed signal for subtotal
        Signal<BigDecimal> subtotalSignal = Signal.computed(
                () -> cartItemsSignal.value().stream().map(ValueSignal::value)
                        .map(item -> item.product().price()
                                .multiply(BigDecimal.valueOf(item.quantity())))
                        .reduce(BigDecimal.ZERO, BigDecimal::add));
        // end::computed-subtotal[]

        // tag::computed-discount[]
        // Computed signal for discount
        Signal<BigDecimal> discountSignal = Signal.computed(() -> {
            String code = discountCodeSignal.value();
            DiscountCode discount = validateDiscountCode(code);
            if (discount != null) {
                return subtotalSignal.value().multiply(discount.percentage())
                        .divide(new BigDecimal("100"), 2, RoundingMode.HALF_UP);
            }
            return BigDecimal.ZERO;
        });
        // end::computed-discount[]

        // tag::computed-shipping[]
        // Computed signal for shipping cost
        Signal<BigDecimal> shippingSignal = Signal
                .computed(() -> getShippingCost(shippingOptionSignal.value()));
        // end::computed-shipping[]

        // tag::computed-tax[]
        // Computed signal for tax (8%)
        Signal<BigDecimal> taxSignal = Signal.computed(
                () -> subtotalSignal.value().subtract(discountSignal.value())
                        .multiply(new BigDecimal("0.08"))
                        .setScale(2, RoundingMode.HALF_UP));
        // end::computed-tax[]

        // tag::computed-total[]
        // Computed signal for grand total
        Signal<BigDecimal> totalSignal = Signal.computed(() -> subtotalSignal.value()
                .subtract(discountSignal.value()).add(shippingSignal.value())
                .add(taxSignal.value()).setScale(2, RoundingMode.HALF_UP));
        // end::computed-total[]

        List<Product> products = List.of(
                new Product("1", "Laptop", new BigDecimal("999.99")),
                new Product("2", "Mouse", new BigDecimal("25.99")),
                new Product("3", "Keyboard", new BigDecimal("79.99")),
                new Product("4", "Monitor", new BigDecimal("249.50")));

        // Products list
        H3 productsTitle = new H3("Available Products");
        Div productsContainer = new Div();
        products.forEach(product -> productsContainer
                .add(createProductRow(product, cartItemsSignal)));

        // Cart items display
        H3 cartTitle = new H3("Shopping Cart");
        Div cartItemsContainer = new Div();

        Div cartItemsList = new Div();
        // tag::bindchildren[]
        ComponentEffect.bindChildren(cartItemsList, cartItemsSignal,
                itemSignal -> createCartItemRow(itemSignal, cartItemsSignal));
        // end::bindchildren[]

        Paragraph emptyCart = new Paragraph("Empty cart");
        emptyCart.bindVisible(
                Signal.computed(() -> cartItemsSignal.value().isEmpty()));
        cartItemsContainer.add(emptyCart, cartItemsList);

        // Options section
        HorizontalLayout optionsLayout = new HorizontalLayout();
        optionsLayout.setWidthFull();

        // tag::discount-field[]
        TextField discountField = new TextField("Discount Code");
        discountField.setPlaceholder("Enter SAVE10 or SAVE20");
        discountField.bindValue(discountCodeSignal);
        // end::discount-field[]

        // tag::shipping-select[]
        ComboBox<ShippingOption> shippingSelect = new ComboBox<>("Shipping Method",
                ShippingOption.values());
        shippingSelect.setValue(ShippingOption.STANDARD);
        shippingSelect.bindValue(shippingOptionSignal);
        // end::shipping-select[]

        optionsLayout.add(discountField, shippingSelect);

        // tag::totals-display[]
        // Totals display
        Div totalsBox = new Div();

        H3 summaryTitle = new H3("Order Summary");

        Span subtotalLabel = new Span();
        subtotalLabel.bindText(subtotalSignal.map(total -> "Subtotal: $"
                + total.setScale(2, RoundingMode.HALF_UP)));

        Span discountLabel = new Span();
        discountLabel.bindText(discountSignal.map(discount -> "Discount: -$"
                + discount.setScale(2, RoundingMode.HALF_UP)));
        discountLabel.bindVisible(
                discountSignal.map(d -> d.compareTo(BigDecimal.ZERO) > 0));

        Span shippingLabel = new Span();
        shippingLabel.bindText(shippingSignal.map(shipping -> "Shipping: $"
                + shipping.setScale(2, RoundingMode.HALF_UP)));

        Span taxLabel = new Span();
        taxLabel.bindText(taxSignal.map(
                tax -> "Tax (8%): $" + tax.setScale(2, RoundingMode.HALF_UP)));

        Span totalLabel = new Span();
        totalLabel.bindText(totalSignal.map(
                total -> "Total: $" + total.setScale(2, RoundingMode.HALF_UP)));

        totalsBox.add(summaryTitle, subtotalLabel, discountLabel, shippingLabel,
                taxLabel, totalLabel);
        // end::totals-display[]

        add(productsTitle, productsContainer, cartTitle, cartItemsContainer,
                optionsLayout, totalsBox);
    }

    private HorizontalLayout createProductRow(Product product,
            ListSignal<CartItem> cartItemsSignal) {
        HorizontalLayout row = new HorizontalLayout();

        Span nameLabel = new Span(product.name() + " - $"
                + product.price().setScale(2, RoundingMode.HALF_UP));

        Button addButton = new Button("Add",
                e -> addToCart(product, cartItemsSignal));

        row.add(nameLabel, addButton);
        return row;
    }

    // tag::cart-item-row[]
    private HorizontalLayout createCartItemRow(ValueSignal<CartItem> itemSignal,
            ListSignal<CartItem> cartItemsSignal) {
        CartItem item = itemSignal.value();

        HorizontalLayout row = new HorizontalLayout();

        Span nameLabel = new Span(item.product().name() + " - $"
                + item.product().price().setScale(2, RoundingMode.HALF_UP));

        IntegerField quantityField = new IntegerField();
        quantityField.setMin(1);
        quantityField.setMax(99);
        quantityField.setWidth("120px");
        quantityField.setStepButtonsVisible(true);

        // Two-way mapped signal for quantity
        WritableSignal<Integer> quantitySignal = itemSignal
                .map(CartItem::quantity, CartItem::withQuantity);
        quantityField.bindValue(quantitySignal);

        // Handle removal when quantity drops below 1
        quantityField.addValueChangeListener(e -> {
            Integer value = e.getValue();
            if (value == null || value < 1) {
                cartItemsSignal.remove(itemSignal);
            }
        });

        Span itemTotalLabel = new Span();
        itemTotalLabel.bindText(Signal.computed(() -> {
            CartItem current = itemSignal.value();
            return "$" + current.product().price()
                    .multiply(BigDecimal.valueOf(current.quantity()))
                    .setScale(2, RoundingMode.HALF_UP);
        }));

        Button removeButton = new Button("Remove", e -> {
            cartItemsSignal.remove(itemSignal);
        });

        row.add(nameLabel, quantityField, itemTotalLabel, removeButton);
        return row;
    }
    // end::cart-item-row[]

    // tag::add-to-cart[]
    private void addToCart(Product product,
            ListSignal<CartItem> cartItemsSignal) {
        cartItemsSignal.value().stream().filter(
                signal -> signal.value().product().id().equals(product.id()))
                .findFirst().ifPresentOrElse(
                        existing -> existing.value(existing.value()
                                .withQuantity(existing.value().quantity() + 1)),
                        () -> cartItemsSignal
                                .insertLast(new CartItem(product, 1)));
    }
    // end::add-to-cart[]

    private DiscountCode validateDiscountCode(String code) {
        return switch (code.toUpperCase()) {
        case "SAVE10" -> new DiscountCode("SAVE10", new BigDecimal("10"));
        case "SAVE20" -> new DiscountCode("SAVE20", new BigDecimal("20"));
        default -> null;
        };
    }

    private BigDecimal getShippingCost(ShippingOption option) {
        return switch (option) {
        case STANDARD -> new BigDecimal("5.99");
        case EXPRESS -> new BigDecimal("12.99");
        case OVERNIGHT -> new BigDecimal("24.99");
        };
    }
}
