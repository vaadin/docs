# Production-Ready Vaadin Signals: Short Summary (25.1)

## What Are Signals?

Signals are **reactive value holders** that automatically track dependencies and update the UI when state changes — no manual listener wiring needed. Instead of manually updating UI components when data changes, you declare the relationship once, and signals keep everything synchronized automatically.

```java
// Traditional approach: Manual updates
NumberField priceField = new NumberField("Price");
NumberField quantityField = new NumberField("Quantity");
Span totalLabel = new Span();

priceField.addValueChangeListener(e ->
    totalLabel.setText("Total: " + (priceField.getValue() * quantityField.getValue())));
quantityField.addValueChangeListener(e ->
    totalLabel.setText("Total: " + (priceField.getValue() * quantityField.getValue())));

// With signals: Automatic reactive updates
ValueSignal<Double> price = new ValueSignal<>(0.0);
ValueSignal<Double> quantity = new ValueSignal<>(0.0);

priceField.bindValue(price, price::set);
quantityField.bindValue(quantity, quantity::set);
totalLabel.bindText(() -> "Total: " + (price.get() * quantity.get()));
```

### Key Capabilities

- **Automatic dependency tracking** — Reading a signal inside an effect registers a subscription; changes trigger re-evaluation
- **Derived/computed values** — `signal.map(...)` creates derived signals that stay in sync
- **Two-way binding for input fields** — Use `bindValue()` to sync input fields with signals bidirectionally
- **Read-only bindings for UI state** — Use `bindText()`, `bindVisible()`, `bindEnabled()` to reactively update UI based on signal values
- **Lifecycle-aware** — Bindings activate on attach, clean up on detach
- **Local & Shared signals** — `ValueSignal` for per-session state; `SharedValueSignal`/`SharedNumberSignal`/`SharedListSignal` for cross-session, cluster-ready state with optimistic updates and transactions
- **Thread-safe UI updates** — `ui.access(...)` is used automatically when needed

**Result:** Less boilerplate, fewer bugs from inconsistently applied updates, and a clear reactive data flow from state to UI.

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

### 4. Advanced List Signal Capabilities

- Efficient `bindChildren()` that only creates/removes affected components
- Support for both `ListSignal` (local) and `SharedListSignal` (shared across users)

### 5. Automatic Repeatable Reads

- Shared signals automatically use transactions during Vaadin session lock
- Multiple reads within the same request return consistent values
- Prevents race conditions where a signal value changes between reads

```java
// Consistent reads guaranteed
if (sharedSignal.get().equals("update required")) {
    log("Updating from '" + sharedSignal.get() + "'"); // Always logs "update required"
    sharedSignal.set("updated");
}
```

### 6. Signal Bindings vs Effects Lifecycle

- **Signal bindings** (via `bindText()`, `bindVisible()`, etc.) are **permanent** for the component's lifetime
- **Effects** can be **unregistered** via the returned `Registration`

```java
// Permanent binding - lasts as long as component is attached
button.bindText(() -> "Count: " + counter.get());

// Unregistrable effect - can be removed when no longer needed
Registration reg = Signal.effect(() -> 
    System.out.println("Counter: " + counter.get()));
reg.remove(); // Stops the effect
```

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
| `SharedMapSignal<T>` | Multi-user | Configuration, shared properties |
| `SharedNodeSignal` | Multi-user | Hierarchical collaborative data |

### Component Bindings

```java
// Text
label.bindText(() -> "Hello, " + nameSignal.get());

// Visibility
panel.bindVisible(showDetailsSignal);

// Enabled state
button.bindEnabled(formValidSignal);

// Two-way form binding
textField.bindValue(nameSignal, nameSignal::set);

// Styles
div.getStyle().bind("background-color", colorSignal);

// Dynamic lists
container.bindChildren(itemsSignal, itemSignal -> new Span(itemSignal));
```

### Element-Level Bindings

For advanced use cases and custom components:

```java
// Text binding
element.bindText(textSignal);

// Attribute binding
element.bindAttribute("aria-label", labelSignal);

// Property binding (String, Boolean, Double, List, Map, Object)
element.bindProperty("hidden", hiddenSignal::set);
element.bindProperty("items", itemListSignal::set);

// HTML content binding (Html component)
Html html = new Html("<div></div>");
html.bindHtmlContent(htmlContentSignal);
```

### Computed Signals

Three ways to derive values from signals:

```java
// 1. Signal.computed() - for combining multiple signals
Signal<String> fullName = Signal.computed(() ->
    firstName.get() + " " + lastName.get());

// 2. signal.map() - for transforming a single signal
Signal<String> upperName = firstName.map(String::toUpperCase);

// 3. Inline lambda - directly in bindings
label.bindText(() -> "Welcome, " + firstName.get() + "!");
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
        cartItems.get().stream()
            .map(Signal::value)
            .map(item -> item.product().price()
                .multiply(BigDecimal.valueOf(item.quantity())))
            .reduce(BigDecimal.ZERO, BigDecimal::add)
    );

    private final Signal<BigDecimal> discount = Signal.computed(() -> {
        if ("SAVE20".equals(discountCode.get())) {
            return subtotal.get().multiply(new BigDecimal("0.20"));
        }
        return BigDecimal.ZERO;
    });

    private final Signal<BigDecimal> total = Signal.computed(() ->
        subtotal.get().subtract(discount.get())
    );

    public ShoppingCart() {
        // Discount input with two-way binding
        TextField discountField = new TextField("Discount Code");
        discountField.bindValue(discountCode, discountCode::set);

        // Totals display
        Span subtotalLabel = new Span();
        subtotalLabel.bindText(() -> "Subtotal: $" + subtotal.get());

        Span discountLabel = new Span();
        discountLabel.bindText(() -> "Discount: -$" + discount.get());
        discountLabel.bindVisible(() -> discount.get().compareTo(BigDecimal.ZERO) > 0);

        Span totalLabel = new Span();
        totalLabel.bindText(() -> "Total: $" + total.get());

        // Dynamic cart items
        VerticalLayout cartList = new VerticalLayout();
        cartList.bindChildren(cartItems, itemSignal -> {
            HorizontalLayout row = new HorizontalLayout();

            Span name = new Span(() -> itemSignal.get().product().name());

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
- Dynamic list rendering
- Conditional visibility

---

## Best Practices

### ✅ Do

- **Use local signals** for single-user UI state
- **Use shared signals** for multi-user collaboration
- **Prefer bindings** over manual effects
- **Use records** for immutable data
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
Signal.effect(label, () -> label.setText(signal.get()));

// Bad: Direct mutation
User user = userSignal.get();
user.setAge(31); // Won't work!

// Good: Update through signal
userSignal.update(user -> user.withAge(31));
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
    .bind(Person::name, (p, n) -> nameSignal.set(n));

// Use binder's built-in validation status signal
Signal<Boolean> isValid = binder.getValidationStatus()
    .map(status -> !status.hasErrors());
saveButton.bindEnabled(isValid);
```

### UI Locale Signal

Vaadin provides a built-in signal for reactive locale changes:
```java
// React to locale changes automatically
Signal<Locale> localeSignal = UI.getCurrent().localeSignal();

Span greeting = new Span();
greeting.bindText(() ->
        localeSignal.get().getLanguage().equals("fi") ? "Tervetuloa" : "Welcome"));

// Change locale - all bindings update automatically
UI.getCurrent().setLocale(new Locale("fi"));
```

### Local vs Shared Signals

| Aspect | Local | Shared |
|--------|-------|--------|
| Scope | Single UI | Multi-user |
| Performance | Faster (synchronous) | Slightly slower (asynchronous) |
| Value types | Any Java object | JSON serializable only |
| API | Synchronous | Asynchronous (returns operations) |
| Transactions | ❌ | ✅ |
| Cluster support | ❌ | ✅ |
| Example | Form state | Collaborative dashboard |

---
