# Vaadin Signals: Summary for Version 25.1

## Overview

Vaadin Signals is a reactive state management framework for Vaadin Flow applications. This document highlights the essential changes between Vaadin 25.0 and 25.1, provides a comprehensive API summary, and demonstrates advanced patterns through practical examples.

---

## What's New in Vaadin 25.1

### Key Changes from Version 25.0

#### 1. **Simplified API with Local and Shared Signals**

**Vaadin 25.0:**
- Used a factory-based approach with `SignalFactory.IN_MEMORY_SHARED`
- All signals were "shared" by default, requiring explicit configuration
- More verbose initialization: `SignalFactory.IN_MEMORY_SHARED.number("counter")`

**Vaadin 25.1:**
- Introduced **local signals** (`ValueSignal`, `ListSignal`) for UI-only state
- Simplified creation: `new ValueSignal<>("initial")` or `new ListSignal<>()`
- Explicit **shared signals** (`SharedValueSignal`, `SharedNumberSignal`, etc.) for multi-user scenarios
- Clear separation between single-user UI state and collaborative state

#### 2. **Enhanced Component Binding API**

**New in 25.1:**
- Direct component-level binding methods: `bindText()`, `bindVisible()`, `bindEnabled()`, `bindValue()`
- Two-way form field binding with `bindValue(signal, setter)`
- Dynamic list rendering with `bindChildren()` for efficient list updates
- Theme variant binding with `getThemeList().bind()`
- Inline style binding with `getStyle().bind()`
- Read-only field binding with `bindReadOnly()`

#### 3. **Two-Way Signal Mapping**

**New in 25.1:**
- `updater()` method for immutable values (records): creates wither-style setters
- `modifier()` method for mutable beans: handles in-place mutations
- Simplified property-level two-way binding without manual callbacks

```java
// 25.1: Two-way binding to record properties
checkbox.bindValue(todoSignal.map(Todo::done), todoSignal.updater(Todo::withDone));

// 25.1: Two-way binding to bean properties
textField.bindValue(userSignal.map(User::getName), userSignal.modifier(User::setName));
```

#### 4. **Advanced List Signal Capabilities**

**Enhanced in 25.1:**
- Per-entry reactivity: changes to individual list items don't trigger full list re-renders
- Efficient `bindChildren()` that only creates/removes affected components
- Support for both `ListSignal` (local) and `SharedListSignal` (shared across users)

#### 5. **Explicit Write Callbacks in Transactions**

**Vaadin 25.1** provides explicit control over write operations through:
- Clear separation between read-only and write operations
- Effect callbacks run in read-only transactions (prevents accidental mutations)
- Explicit `runWithoutTransaction()` for intentional side effects

#### 6. **Automatic Repeatable Reads**

**Introduced in 25.1** ([PR #23556](https://github.com/vaadin/flow/pull/23556)):
- Operations like `update()` automatically retry on concurrent modifications
- Compare-and-set semantics with automatic retry loops
- `CancelableOperation` returned from `update()` allows cancellation if needed

```java
// Automatically retries if another user modifies the counter concurrently
counter.update(v -> v + 1);
```

#### 7. **Signal Bindings vs Effects Lifecycle**

**Key difference:**
- **Signal bindings** (via `bindText()`, `bindVisible()`, etc.) are **permanent** for the component's lifetime
- **Effects** (via `Effect.effect()`) can be **unregistered** via the returned `Registration`

```java
// Permanent binding - lasts as long as component is attached
button.bindText(counter.map(c -> "Count: " + c));

// Unregistrable effect - can be removed when no longer needed
Registration reg = Effect.effect(() -> {
    System.out.println("Counter: " + counter.value());
});
reg.remove(); // Stops the effect
```

---

## Comprehensive API Summary

### Core Signal Types

| Type | Description | Use Case |
|------|-------------|----------|
| `ValueSignal<T>` | Local single value | UI-only state (panel expansion, form state) |
| `ListSignal<T>` | Local ordered list | Dynamic form fields, local selections |
| `SharedValueSignal<T>` | Shared single value | Multi-user data, collaborative state |
| `SharedNumberSignal` | Shared numeric value | Counters, collaborative numeric data |
| `SharedListSignal<T>` | Shared list | Collaborative lists, real-time data |
| `SharedMapSignal<T>` | Shared key-value map | Configuration, shared properties |
| `SharedNodeSignal` | Shared tree structure | Hierarchical collaborative data |

### Component Bindings

#### Text Binding
```java
Span label = new Span();
label.bindText(nameSignal.map(n -> "Hello, " + n));
label.bindText(() -> firstName.value() + " " + lastName.value());
```

#### Visibility Binding
```java
Div panel = new Div();
panel.bindVisible(showDetailsSignal);
panel.bindVisible(searchText.map(text -> !text.isEmpty()));
```

#### Enabled State Binding
```java
Button submitButton = new Button("Submit");
submitButton.bindEnabled(formValidSignal);
submitButton.bindEnabled(Signal.computed(() ->
    !email.value().isEmpty() && password.value().length() >= 8));
```

#### Two-Way Form Field Binding

**Basic binding:**
```java
TextField nameField = new TextField();
nameField.bindValue(nameSignal, nameSignal::set);
```

**Property-level binding (immutable records):**
```java
record Todo(String text, boolean done) {
    Todo withDone(boolean done) { return new Todo(this.text, done); }
}

Checkbox checkbox = new Checkbox();
checkbox.bindValue(todoSignal.map(Todo::done), todoSignal.updater(Todo::withDone));
```

**Property-level binding (mutable beans):**
```java
TextField nameField = new TextField();
nameField.bindValue(userSignal.map(User::getName), userSignal.modifier(User::setName));
```

**Read-only binding:**
```java
TextField field = new TextField();
field.bindReadOnly(lockedSignal);
```

#### Dynamic List Rendering
```java
VerticalLayout container = new VerticalLayout();
ListSignal<String> items = new ListSignal<>();

container.bindChildren(items, itemSignal -> {
    Span itemView = new Span();
    itemView.bindText(itemSignal, itemSignal::set);
    return itemView;
});

items.insertLast("Item 1");
items.insertLast("Item 2");
```

#### Style Bindings
```java
// Inline styles
Div panel = new Div();
panel.getStyle().bind("background-color", colorSignal);
panel.getStyle().bind("width", widthSignal.map(w -> w + "px"));

// Theme variants
Button button = new Button();
button.getThemeList().bind("primary", isPrimarySignal);

// CSS classes
Span label = new Span();
label.getElement().getClassList().bind("active", isActiveSignal);
```

### Element-Level Bindings

For advanced use cases and custom components:

```java
// Text binding
element.bindText(textSignal);

// Attribute binding
element.bindAttribute("aria-label", labelSignal);

// Property binding (String, Boolean, Double, List, Map, Object)
element.bindProperty("hidden", hiddenSignal);
element.bindProperty("items", itemListSignal);

// HTML content binding (Html component)
Html html = new Html("<div></div>");
html.bindHtmlContent(htmlContentSignal);
```

### Signal Operations

#### Reading Values
```java
String current = signal.value();        // Read with dependency tracking
String peeked = signal.peek();          // Read without dependency tracking
String confirmed = signal.peekConfirmed(); // Cluster-confirmed value (shared signals)
```

#### Writing Values
```java
signal.value("new value");                    // Direct assignment
signal.update(current -> current + "!");      // Update based on current value
signal.replace("expected", "new");            // Compare-and-set
signal.modify(obj -> obj.setProperty(val));   // For mutable objects
```

#### List Operations
```java
ListSignal<String> items = new ListSignal<>();

ValueSignal<String> first = items.insertFirst("First");
ValueSignal<String> last = items.insertLast("Last");
ValueSignal<String> middle = items.insertAt(1, "Middle");

items.remove(first);
items.clear();

List<ValueSignal<String>> allItems = items.value();
```

### Effects and Computed Signals

#### Effects
```java
// Automatic dependency tracking
Effect.effect(() -> {
    component.setSomething(signal.value());
});

// With cleanup
Registration reg = Effect.effect(() -> {
    System.out.println("Value: " + signal.value());
});
reg.remove(); // Unregister effect

// Standalone effects (require manual cleanup)
CleanupCallback cleanup = Signal.effect(() -> {
    System.out.println("Standalone effect: " + signal.value());
});
cleanup.cleanup(); // Must be called to prevent memory leaks
```

#### Computed Signals
```java
// Combining multiple signals
Signal<String> fullName = Signal.computed(() ->
    firstName.value() + " " + lastName.value());

// Single-signal transformation
Signal<String> upperName = name.map(String::toUpperCase);

// Boolean negation
Signal<Boolean> notLoading = Signal.not(loadingSignal);
```

#### Untracked Reads
```java
Effect.effect(() -> {
    String tracked = trackedSignal.value();     // Creates dependency
    String untracked = untrackedSignal.peek();  // No dependency

    Signal.untracked(() -> {
        String alsoUntracked = anotherSignal.value(); // No dependency
    });
});
```

### Transactions

```java
// Basic transaction
Signal.runInTransaction(() -> {
    firstNameSignal.value("John");
    lastNameSignal.value("Doe");
    ageSignal.value(30);
});

// With verification
Signal.runInTransaction(() -> {
    statusSignal.verifyValue("pending");
    statusSignal.value("processing");
});

// With result tracking
TransactionOperation txOp = Signal.runInTransaction(() -> {
    // Multiple operations
});
SignalOperation<?> result = txOp.returnValue();
```

#### Operation Results

```java
// Basic operation
SignalOperation<String> op = signal.value("new");
CompletableFuture<ResultOrError<String>> future = op.result();

// Cancelable operation (from update)
CancelableOperation<Integer> updateOp = counter.update(v -> v + 1);
updateOp.cancel(); // Cancel retry loop

// Insert operation
InsertOperation<Todo> insertOp = todoList.insertLast(new Todo("Task", false));
ValueSignal<Todo> newItemSignal = insertOp.signal(); // Immediate access
```

### Form Binding Integration

Signals integrate with Vaadin's `Binder` for validation:

```java
record Person(String name, int age) {}

ValueSignal<String> nameSignal = new ValueSignal<>("");
ValueSignal<Integer> ageSignal = new ValueSignal<>(0);

Binder<Person> binder = new Binder<>(Person.class);

TextField nameField = new TextField("Name");
nameField.bindValue(nameSignal, nameSignal::set);
binder.forField(nameField)
    .asRequired("Name is required")
    .bind(Person::name, (person, name) -> nameSignal.value(name));

IntegerField ageField = new IntegerField("Age");
ageField.bindValue(ageSignal, ageSignal::set);
binder.forField(ageField)
    .withValidator(age -> age >= 18, "Must be 18 or older")
    .bind(Person::age, (person, age) -> ageSignal.value(age));

// Validation status as signal
Signal<Boolean> isValid = Signal.computed(() -> binder.isValid());
Button saveButton = new Button("Save");
saveButton.bindEnabled(isValid);
```

---

## Design and Behavior Aspects

### 1. Explicit Write Callbacks

Signal operations provide explicit callbacks for tracking operation lifecycle:

```java
SignalOperation<String> op = signal.value("new value");
op.result().thenAccept(resultOrError -> {
    if (resultOrError.successful()) {
        System.out.println("Write confirmed by cluster");
    } else {
        System.out.println("Write failed: " + resultOrError.error());
    }
});
```

### 2. Automatic Repeatable Reads

The `update()` method implements optimistic locking with automatic retries:

```java
// If another user changes the counter concurrently,
// this operation automatically retries with the new value
CancelableOperation<Double> op = counter.update(v -> v + 1);

// Can be canceled if needed
if (someCondition) {
    op.cancel();
}
```

### 3. Permanent Bindings vs Unregistrable Effects

- **Bindings are permanent:** Once you call `bindText()`, `bindVisible()`, etc., the binding lasts for the component's lifetime
- **Effects can be unregistered:** Effects return a `Registration` that allows cleanup

```java
// Permanent - no way to unbind
button.bindText(counterSignal.map(c -> "Count: " + c));

// Unregistrable - can be stopped
Registration effectReg = Effect.effect(() -> {
    System.out.println("Current count: " + counterSignal.value());
});

// Later...
effectReg.remove(); // Effect no longer runs
```

To "unbind" a component, you can pass `null` to element-level bindings:

```java
element.bindText(signal);
// Later...
element.bindText(null); // Unbinds the signal
```

### 4. Thread Safety and UI Access

Signal operations are thread-safe and automatically handle UI synchronization:

```java
// No ui.access() needed - signals handle it internally
CompletableFuture.runAsync(() -> {
    sharedCounter.incrementBy(1); // Safe from any thread
});
```

### 5. Immutability Preference

Signals work best with immutable values (Java records):

```java
// Preferred: Immutable record
record User(String name, int age) {
    User withAge(int age) { return new User(this.name, age); }
}

ValueSignal<User> userSignal = new ValueSignal<>(new User("John", 30));
userSignal.update(u -> u.withAge(31)); // Creates new instance

// Avoid: Mutable objects require modify()
User user = userSignal.value();
user.setAge(32); // Won't trigger reactivity!

// If you must use mutable objects:
userSignal.modify(u -> u.setAge(32)); // Triggers reactivity
```

### 6. Effect Execution Model

- Effects run **immediately** when created
- Effects run **synchronously** during signal updates
- Effects run inside a **read-only transaction** (prevents accidental writes)
- Dependencies are tracked **dynamically** based on actual signal reads

### 7. Local vs Shared Signals

| Aspect | Local Signals | Shared Signals |
|--------|--------------|----------------|
| Scope | Single UI session | Multi-user, cluster-aware |
| Transactions | Not supported | Full support |
| Performance | Faster (in-memory) | Slightly slower (JSON serialization) |
| Cluster Support | Single server only | Works across cluster |
| Use Cases | UI toggles, form state | Collaborative features, real-time dashboards |

---

## Comprehensive Use Case Example

This example demonstrates a **Real-Time Collaborative Task Manager** showcasing most signal features:

```java
@Route("task-manager")
@Push // Required for multi-user real-time updates
public class CollaborativeTaskManager extends VerticalLayout {

    // === State: Mix of Local and Shared Signals ===

    // Local signals: UI-only state (per user)
    private final ValueSignal<String> newTaskText = new ValueSignal<>("");
    private final ValueSignal<TaskFilter> filterType = new ValueSignal<>(TaskFilter.ALL);
    private final ValueSignal<Boolean> showCompleted = new ValueSignal<>(true);
    private final ValueSignal<String> searchQuery = new ValueSignal<>("");

    // Shared signals: Multi-user collaborative state
    private final SharedListSignal<Task> tasks = new SharedListSignal<>(Task.class);
    private final SharedValueSignal<User> currentUser = new SharedValueSignal<>(User.class);
    private final SharedNumberSignal totalTasksCreated = new SharedNumberSignal();

    // === Computed Signals: Derived Values ===

    private final Signal<List<SharedValueSignal<Task>>> filteredTasks = Signal.computed(() -> {
        String query = searchQuery.value().toLowerCase();
        TaskFilter filter = filterType.value();
        boolean showDone = showCompleted.value();

        return tasks.value().stream()
            .filter(taskSignal -> {
                Task task = taskSignal.value();

                // Search filter
                if (!query.isEmpty() && !task.title().toLowerCase().contains(query)) {
                    return false;
                }

                // Status filter
                if (!showDone && task.status() == TaskStatus.COMPLETED) {
                    return false;
                }

                // Type filter
                if (filter == TaskFilter.MY_TASKS && !task.assignee().equals(currentUser.value())) {
                    return false;
                }

                return true;
            })
            .toList();
    });

    private final Signal<Long> activeTaskCount = Signal.computed(() ->
        tasks.value().stream()
            .map(Signal::value)
            .filter(task -> task.status() != TaskStatus.COMPLETED)
            .count()
    );

    private final Signal<Long> completedTaskCount = Signal.computed(() ->
        tasks.value().stream()
            .map(Signal::value)
            .filter(task -> task.status() == TaskStatus.COMPLETED)
            .count()
    );

    private final Signal<Boolean> canAddTask = Signal.computed(() ->
        !newTaskText.value().isBlank() && currentUser.value() != null
    );

    // === Records: Immutable Data Structures ===

    record Task(
        String id,
        String title,
        String description,
        TaskStatus status,
        User assignee,
        User createdBy,
        Instant createdAt,
        Instant completedAt
    ) {
        Task withStatus(TaskStatus status) {
            return new Task(id, title, description, status, assignee,
                createdBy, createdAt,
                status == TaskStatus.COMPLETED ? Instant.now() : null);
        }

        Task withTitle(String title) {
            return new Task(id, title, description, status, assignee,
                createdBy, createdAt, completedAt);
        }

        Task withAssignee(User assignee) {
            return new Task(id, title, description, status, assignee,
                createdBy, createdAt, completedAt);
        }
    }

    record User(String id, String name, String email) {}

    enum TaskStatus { TODO, IN_PROGRESS, COMPLETED }
    enum TaskFilter { ALL, MY_TASKS }

    // === UI Construction ===

    public CollaborativeTaskManager() {
        setSizeFull();
        setPadding(true);

        // Initialize current user (in real app, get from session)
        currentUser.value(new User("user1", "John Doe", "john@example.com"));

        // === Header with Statistics ===
        HorizontalLayout header = createHeader();

        // === Toolbar with Filters ===
        HorizontalLayout toolbar = createToolbar();

        // === Add Task Form ===
        HorizontalLayout addTaskForm = createAddTaskForm();

        // === Task List ===
        VerticalLayout taskList = new VerticalLayout();
        taskList.setPadding(false);
        taskList.setSpacing(false);

        // Dynamic list rendering with bindChildren
        taskList.bindChildren(filteredTasks, this::createTaskCard);

        // Empty state
        Div emptyState = new Div(new Paragraph("No tasks match your filters"));
        emptyState.bindVisible(filteredTasks.map(List::isEmpty));

        add(header, toolbar, addTaskForm, emptyState, taskList);
    }

    private HorizontalLayout createHeader() {
        HorizontalLayout header = new HorizontalLayout();
        header.setWidthFull();
        header.setAlignItems(FlexComponent.Alignment.CENTER);

        H2 title = new H2("Collaborative Task Manager");

        // Real-time statistics
        Span stats = new Span();
        stats.bindText(Signal.computed(() -> String.format(
            "Active: %d | Completed: %d | Total Created: %.0f",
            activeTaskCount.value(),
            completedTaskCount.value(),
            totalTasksCreated.value()
        )));
        stats.getStyle().set("color", "var(--lumo-secondary-text-color)");

        // Current user badge
        Span userBadge = new Span();
        userBadge.bindText(currentUser.map(user ->
            user != null ? "👤 " + user.name() : "Not logged in"));

        header.add(title, stats, userBadge);
        return header;
    }

    private HorizontalLayout createToolbar() {
        HorizontalLayout toolbar = new HorizontalLayout();
        toolbar.setWidthFull();

        // Search field with two-way binding
        TextField searchField = new TextField("Search");
        searchField.setPlaceholder("Search tasks...");
        searchField.setClearButtonVisible(true);
        searchField.bindValue(searchQuery, searchQuery::set);

        // Filter selector
        ComboBox<TaskFilter> filterSelect = new ComboBox<>("Filter");
        filterSelect.setItems(TaskFilter.values());
        filterSelect.setValue(TaskFilter.ALL);
        filterSelect.bindValue(filterType, filterType::set);

        // Show completed toggle
        Checkbox showCompletedCheckbox = new Checkbox("Show completed");
        showCompletedCheckbox.setValue(true);
        showCompletedCheckbox.bindValue(showCompleted, showCompleted::set);

        toolbar.add(searchField, filterSelect, showCompletedCheckbox);
        return toolbar;
    }

    private HorizontalLayout createAddTaskForm() {
        HorizontalLayout form = new HorizontalLayout();
        form.setWidthFull();
        form.setAlignItems(FlexComponent.Alignment.END);

        TextField taskInput = new TextField("New Task");
        taskInput.setPlaceholder("Enter task title...");
        taskInput.setWidthFull();
        taskInput.bindValue(newTaskText, newTaskText::set);

        Button addButton = new Button("Add Task");
        addButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        addButton.bindEnabled(canAddTask);
        addButton.addClickListener(e -> addTask());

        form.add(taskInput, addButton);
        return form;
    }

    private Component createTaskCard(Signal<Task> taskSignal) {
        Card card = new Card();
        VerticalLayout cardContent = new VerticalLayout();
        cardContent.setPadding(true);

        HorizontalLayout cardHeader = new HorizontalLayout();
        cardHeader.setWidthFull();
        cardHeader.setAlignItems(FlexComponent.Alignment.CENTER);

        // Task title with editable functionality
        Span titleSpan = new Span();
        titleSpan.bindText(taskSignal.map(Task::title));
        titleSpan.getStyle().bind("font-weight",
            taskSignal.map(t -> t.status() == TaskStatus.COMPLETED ? "normal" : "bold"));
        titleSpan.getStyle().bind("text-decoration",
            taskSignal.map(t -> t.status() == TaskStatus.COMPLETED ? "line-through" : "none"));

        // Status badge
        Span statusBadge = new Span();
        statusBadge.bindText(taskSignal.map(t -> t.status().toString()));
        statusBadge.getStyle().set("padding", "4px 8px");
        statusBadge.getStyle().set("border-radius", "4px");
        statusBadge.getStyle().set("font-size", "0.8em");
        statusBadge.getStyle().bind("background-color", taskSignal.map(t ->
            switch(t.status()) {
                case TODO -> "#e3f2fd";
                case IN_PROGRESS -> "#fff3e0";
                case COMPLETED -> "#e8f5e9";
            }
        ));

        cardHeader.add(titleSpan, statusBadge);

        // Task metadata
        HorizontalLayout metadata = new HorizontalLayout();

        Span assigneeLabel = new Span();
        assigneeLabel.bindText(taskSignal.map(t ->
            "Assigned to: " + (t.assignee() != null ? t.assignee().name() : "Unassigned")));

        Span createdLabel = new Span();
        createdLabel.bindText(taskSignal.map(t ->
            "Created by " + t.createdBy().name() + " at " +
            t.createdAt().toString().substring(0, 19)));
        createdLabel.getStyle().set("font-size", "0.9em");
        createdLabel.getStyle().set("color", "var(--lumo-secondary-text-color)");

        metadata.add(assigneeLabel, createdLabel);

        // Actions
        HorizontalLayout actions = new HorizontalLayout();

        Button startButton = new Button("Start", e ->
            updateTaskStatus(taskSignal, TaskStatus.IN_PROGRESS));
        startButton.addThemeVariants(ButtonVariant.LUMO_SMALL);
        startButton.bindVisible(taskSignal.map(t -> t.status() == TaskStatus.TODO));

        Button completeButton = new Button("Complete", e ->
            updateTaskStatus(taskSignal, TaskStatus.COMPLETED));
        completeButton.addThemeVariants(ButtonVariant.LUMO_SMALL, ButtonVariant.LUMO_SUCCESS);
        completeButton.bindVisible(taskSignal.map(t -> t.status() != TaskStatus.COMPLETED));

        Button reopenButton = new Button("Reopen", e ->
            updateTaskStatus(taskSignal, TaskStatus.TODO));
        reopenButton.addThemeVariants(ButtonVariant.LUMO_SMALL);
        reopenButton.bindVisible(taskSignal.map(t -> t.status() == TaskStatus.COMPLETED));

        Button deleteButton = new Button("Delete", e -> deleteTask(taskSignal));
        deleteButton.addThemeVariants(ButtonVariant.LUMO_SMALL, ButtonVariant.LUMO_ERROR);

        actions.add(startButton, completeButton, reopenButton, deleteButton);

        cardContent.add(cardHeader, metadata, actions);
        card.add(cardContent);

        return card;
    }

    // === Actions with Transactions ===

    private void addTask() {
        String title = newTaskText.value().trim();
        if (title.isEmpty()) return;

        // Use transaction to atomically create task and increment counter
        Signal.runInTransaction(() -> {
            Task newTask = new Task(
                UUID.randomUUID().toString(),
                title,
                "",
                TaskStatus.TODO,
                currentUser.value(),
                currentUser.value(),
                Instant.now(),
                null
            );

            tasks.insertLast(newTask);
            totalTasksCreated.incrementBy(1);
        });

        // Clear input
        newTaskText.value("");
    }

    private void updateTaskStatus(Signal<Task> taskSignal, TaskStatus newStatus) {
        // Optimistic update with automatic retry on concurrent changes
        taskSignal.update(task -> task.withStatus(newStatus));
    }

    private void deleteTask(Signal<Task> taskSignal) {
        // Use transaction with verification to ensure task still exists
        Signal.runInTransaction(() -> {
            tasks.verifyChild(taskSignal);
            tasks.remove(taskSignal);
        });
    }
}
```

### Features Demonstrated

1. **Local Signals** - UI-only state (search query, filters, form input)
2. **Shared Signals** - Multi-user collaborative state (tasks list, counters)
3. **Computed Signals** - Derived values (filtered tasks, statistics)
4. **Text Bindings** - Dynamic text content
5. **Visibility Bindings** - Conditional component display
6. **Enabled State Bindings** - Form validation
7. **Style Bindings** - Dynamic styling based on state
8. **Two-Way Form Binding** - TextField synchronization
9. **Dynamic List Rendering** - `bindChildren()` for efficient updates
10. **Transactions** - Atomic multi-signal updates
11. **Validation Status** - Form validation with signals
12. **Automatic Retries** - `update()` with optimistic locking

---

## Migration Guide: 25.0 → 25.1

### Before (25.0)
```java
// Factory-based creation
SignalFactory factory = SignalFactory.IN_MEMORY_SHARED;
NumberSignal counter = factory.number("counter");

// Manual effect for UI updates
ComponentEffect.effect(button, () ->
    button.setText(String.format("Clicked %.0f times", counter.value())));
```

### After (25.1)
```java
// Direct instantiation with clear local/shared distinction
SharedNumberSignal counter = new SharedNumberSignal();

// Direct binding
button.bindText(counter.map(c -> String.format("Clicked %.0f times", c)));
```

---

## Best Practices

1. **Choose the right signal type:**
   - Local signals for UI-only state
   - Shared signals for multi-user collaboration

2. **Prefer bindings over effects:**
   - Use `bindText()`, `bindVisible()`, etc. for common properties
   - Reserve effects for custom logic

3. **Use immutable data structures:**
   - Java records are ideal for signal values
   - Use wither methods for updates

4. **Leverage computed signals:**
   - Cache expensive derivations
   - Combine multiple signal sources

5. **Group related updates in transactions:**
   - Ensure atomicity for related changes
   - Use verification for conditional updates

6. **Enable @Push for shared signals:**
   - Required for real-time multi-user updates
   - Ensures immediate synchronization

7. **Clean up standalone effects:**
   - Always call `cleanup()` on standalone effects
   - Bindings automatically clean up when components detach

---

## Conclusion

Vaadin 25.1 Signals provides a mature, production-ready reactive state management framework with:

- **Simplified API** - Clear distinction between local and shared signals
- **Comprehensive binding support** - Direct component bindings for all common properties
- **Advanced patterns** - Two-way mapping, transactions, automatic retries
- **Performance optimization** - Per-item reactivity, efficient list rendering
- **Multi-user support** - Built-in collaboration with shared signals

The framework combines the simplicity of modern reactive libraries with the robustness required for enterprise applications, making it an excellent choice for building dynamic, collaborative Vaadin applications.
