# Production-ready Vaadin Signals: Short Summary (25.1)

## What Are Signals?

Signals are **reactive value holders** that automatically track dependencies and update the UI when state changes — no manual listener wiring needed. Instead of manually updating UI components when data changes, you declare the relationship once, and signals keep everything synchronized automatically.

```java
// Traditional approach: Manual listener wiring
TextField textField = new TextField();
Span label = new Span();
textField.addValueChangeListener(e -> label.setText("Hello " + e.getValue()));

// With signals: Automatic updates
ValueSignal<String> name = new ValueSignal<>("");
TextField textField = new TextField();
Span label = new Span();
textField.bindValue(name, name::set);       // two-way bind
label.bindText(name.map(v -> "Hello " + v)); // auto-updates
```

### Key Capabilities

- **Automatic dependency tracking** — Reading a signal inside an effect registers a subscription; changes trigger re-evaluation
- **Derived/computed values** — `signal.map(...)` creates derived signals that stay in sync
- **Two-way binding** — Bind UI components to signals with a single call (`bindValue`, `bindText`, `bindVisible`, `bindEnabled`)
- **Lifecycle-aware** — Bindings activate on attach, clean up on detach
- **Local & Shared signals** — `ValueSignal` for per-session state; `SharedValueSignal`/`SharedNumberSignal`/`SharedListSignal` for cross-session, cluster-ready state with optimistic updates and transactions
- **Thread-safe UI updates** — `ui.access(...)` is used automatically when needed

**Result:** Less boilerplate, fewer bugs from forgotten listeners, and a clear reactive data flow from state to UI.

---

## Key Changes: 25.0 → 25.1

### 1. Simplified API

**25.0:** Factory-based, verbose
```java
SignalFactory.IN_MEMORY_SHARED.number("counter");
```

**25.1:** Direct instantiation, clear intent
```java
new ValueSignal<>(0);           // Local (single user)
new SharedNumberSignal();        // Shared (multi-user)
```

### 2. Direct Component Bindings

**New binding methods** eliminate boilerplate:
```java
button.bindText(signal);
panel.bindVisible(signal);
submitButton.bindEnabled(signal);
textField.bindValue(signal, signal::set);
```

### 3. Two-Way Signal Mapping

Bind directly to record/bean properties:
```java
record Todo(String text, boolean done) {
    Todo withDone(boolean done) { return new Todo(this.text, done); }
}

// Checkbox binds to 'done' property only
checkbox.bindValue(
    todoSignal.map(Todo::done),
    todoSignal.updater(Todo::withDone)
);
```

### 4. Advanced Features

- **Automatic retries:** `update()` operations retry on concurrent changes
- **Permanent bindings:** Unlike effects, bindings last the component's lifetime
- **Per-item reactivity:** List changes only update affected components

---

## Core Concepts

### Signal Types

| Type | Scope | Use Case |
|------|-------|----------|
| `ValueSignal<T>` | Local | UI toggles, form state |
| `ListSignal<T>` | Local | Dynamic form fields |
| `SharedValueSignal<T>` | Multi-user | Collaborative data |
| `SharedNumberSignal` | Multi-user | Counters, metrics |
| `SharedListSignal<T>` | Multi-user | Real-time lists |

### Component Bindings

```java
// Text
label.bindText(nameSignal.map(n -> "Hello, " + n));

// Visibility
panel.bindVisible(showDetailsSignal);

// Enabled state
button.bindEnabled(formValidSignal);

// Two-way form binding
textField.bindValue(nameSignal, nameSignal::set);

// Styles
div.getStyle().bind("background-color", colorSignal);

// Dynamic lists
container.bindChildren(itemsSignal, item -> {
    Span view = new Span();
    view.bindText(item, item::set);
    return view;
});
```

### Computed Signals

Derive values from other signals:
```java
Signal<String> fullName = Signal.computed(() ->
    firstName.value() + " " + lastName.value());

Signal<Boolean> formValid = Signal.computed(() ->
    !email.value().isEmpty() && password.value().length() >= 8);
```

### Transactions

Group related updates atomically:
```java
Signal.runInTransaction(() -> {
    firstNameSignal.value("John");
    lastNameSignal.value("Doe");
    ageSignal.value(30);
});
```

---

## Practical Example: Shopping Cart

```java
@Route("cart")
public class ShoppingCart extends VerticalLayout {

    record CartItem(Product product, int quantity) {
        CartItem withQuantity(int qty) {
            return new CartItem(this.product, qty);
        }
    }

    // State
    private final ListSignal<CartItem> cartItems = new ListSignal<>();
    private final ValueSignal<String> discountCode = new ValueSignal<>("");

    // Computed signals
    private final Signal<BigDecimal> subtotal = Signal.computed(() ->
        cartItems.value().stream()
            .map(Signal::value)
            .map(item -> item.product().price()
                .multiply(BigDecimal.valueOf(item.quantity())))
            .reduce(BigDecimal.ZERO, BigDecimal::add)
    );

    private final Signal<BigDecimal> discount = Signal.computed(() -> {
        if ("SAVE20".equals(discountCode.value())) {
            return subtotal.value().multiply(new BigDecimal("0.20"));
        }
        return BigDecimal.ZERO;
    });

    private final Signal<BigDecimal> total = Signal.computed(() ->
        subtotal.value().subtract(discount.value())
    );

    public ShoppingCart() {
        // Discount input with two-way binding
        TextField discountField = new TextField("Discount Code");
        discountField.bindValue(discountCode, discountCode::set);

        // Totals display
        Span subtotalLabel = new Span();
        subtotalLabel.bindText(subtotal.map(s -> "Subtotal: $" + s));

        Span discountLabel = new Span();
        discountLabel.bindText(discount.map(d -> "Discount: -$" + d));
        discountLabel.bindVisible(discount.map(d -> d.compareTo(BigDecimal.ZERO) > 0));

        Span totalLabel = new Span();
        totalLabel.bindText(total.map(t -> "Total: $" + t));

        // Dynamic cart items
        VerticalLayout cartList = new VerticalLayout();
        cartList.bindChildren(cartItems, itemSignal -> {
            HorizontalLayout row = new HorizontalLayout();

            Span name = new Span();
            name.bindText(itemSignal.map(i -> i.product().name()));

            IntegerField qtyField = new IntegerField();
            qtyField.bindValue(
                itemSignal.map(CartItem::quantity),
                itemSignal.updater(CartItem::withQuantity)
            );

            Button remove = new Button("Remove",
                e -> cartItems.remove(itemSignal));

            row.add(name, qtyField, remove);
            return row;
        });

        add(discountField, cartList, subtotalLabel, discountLabel, totalLabel);
    }
}
```

**Features demonstrated:**
- Local signals for UI state
- Computed signals for calculations
- Two-way form binding
- Property-level binding with `updater()`
- Dynamic list rendering
- Conditional visibility

---

## Best Practices

### ✅ Do

- **Use local signals** for single-user UI state
- **Use shared signals** for multi-user collaboration
- **Prefer bindings** over manual effects
- **Use records** for immutable data
- **Group related updates** in transactions
- **Enable @Push**

```java
// Good: Direct binding
button.bindText(signal);

// Good: Immutable record
record User(String name, int age) {
    User withAge(int age) { return new User(this.name, age); }
}
```

### ❌ Avoid

- **Don't update signals in effects** (causes infinite loops)
- **Don't mutate objects directly** (won't trigger reactivity)
- **Don't use effects for simple bindings**

```java
// Bad: Manual update in effect
Effect.effect(() -> label.setText(signal.value()));

// Bad: Direct mutation
User user = userSignal.value();
user.setAge(31); // Won't work!

// Good: Update through signal
userSignal.update(u -> u.withAge(31));
```

---

## Advanced Features

### Form Validation Integration

```java
Binder<Person> binder = new Binder<>(Person.class);

TextField nameField = new TextField();
nameField.bindValue(nameSignal, nameSignal::set);
binder.forField(nameField)
    .asRequired("Name required")
    .bind(Person::name, (p, n) -> nameSignal.value(n));

// Validation status as signal
Signal<Boolean> isValid = Signal.computed(() -> binder.isValid());
saveButton.bindEnabled(isValid);
```

### UI Locale Signal

Vaadin provides a built-in signal for reactive locale changes:
```java
// React to locale changes automatically
Signal<Locale> localeSignal = UI.getCurrent().localeSignal();

Span greeting = new Span();
greeting.bindText(localeSignal.map(locale ->
    locale.getLanguage().equals("fi") ? "Tervetuloa" : "Welcome"));

// Change locale - all bindings update automatically
UI.getCurrent().setLocale(new Locale("fi"));
```

### Permanent Bindings vs Effects

```java
// Binding: Permanent for component lifetime
button.bindText(counterSignal.map(c -> "Count: " + c));

// Effect: Can be unregistered
Registration reg = Effect.effect(() -> {
    System.out.println("Count: " + counterSignal.value());
});
reg.remove(); // Stop the effect
```

### Local vs Shared Signals

| Aspect | Local | Shared |
|--------|-------|--------|
| Scope | Single UI | Multi-user |
| Performance | Faster | Slightly slower |
| Transactions | ❌ | ✅ |
| Cluster support | ❌ | ✅ |
| Example | Form state | Collaborative dashboard |

---
