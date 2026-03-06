package com.vaadin.demo.flow.signals.usecase;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.data.binder.ValidationException;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.signals.Signal;
import com.vaadin.flow.signals.local.ValueSignal;
import org.jspecify.annotations.NonNull;

import java.util.List;

@Route("crud-editor-with-signals")
public class CrudEditorExample extends VerticalLayout {

    // tag::item-signal[]
    static private final Item NEW_ITEM = new Item();
    // end::item-signal[]

    public CrudEditorExample() {
        // tag::grid-setup[]
        Grid<Item> itemGrid = new Grid<>(Item.class);
        itemGrid.setColumns("product", "category");
        itemGrid.setItems(listItems());
        // end::grid-setup[]

        // tag::item-signal[]
        ValueSignal<Item> selectedItemSignal = new ValueSignal<>(NEW_ITEM);
        // end::item-signal[]
        // tag::selection[]
        // Update signal when user selects an item in the grid
        itemGrid.addSelectionListener((event) -> selectedItemSignal
                .set(event.getFirstSelectedItem().orElse(NEW_ITEM)));

        // Keep grid selection in sync with the signal (if signal changes
        // programmatically)
        Signal.effect(this, () -> itemGrid.select(selectedItemSignal.get()));
        // end::selection[]

        add(itemGrid);

        // tag::form[]
        Binder<Item> itemBinder = new Binder<>();

        TextField productNameField = new TextField("Product");
        itemBinder.forField(productNameField).bind(Item::getProduct,
                Item::setProduct);

        ComboBox<String> categoryField = new ComboBox<>("Category");
        categoryField.setItems(List.of("Office", "Tech", "Stationery"));
        itemBinder.forField(categoryField).bind(Item::getCategory,
                Item::setCategory);
        // end::form[]

        // tag::binder-signal[]
        Signal.effect(this,
                () -> itemBinder.readBean(selectedItemSignal.get()));
        // end::binder-signal[]

        // tag::derived-signal[]
        // Derived signal, true when no item is selected (creating a new item)
        final Signal<Boolean> creatingItemSignal = selectedItemSignal
                .map(NEW_ITEM::equals);
        // end::derived-signal[]

        // tag::save-snippet[]
        Button saveButton = new Button(
                () -> creatingItemSignal.get() ? "Create" : "Update");

        saveButton.addClickListener((event) -> {
            try {
                // Note: the method uses `peek()` to read signals, as the click
                // listener should not subscribe to the state changes.
                boolean creatingItem = creatingItemSignal.peek();
                // Create a new item instance or reuse existing for editing
                Item item = creatingItem ? new Item()
                        : selectedItemSignal.peek();

                // Save changes from the binder
                itemBinder.writeBean(item);
                item = saveItem(item);

                // Update the selected item signal to use the saved item
                selectedItemSignal.set(item);

                // Refresh the data in the grid
                itemGrid.getDataProvider().refreshAll();

                // Show success notification
                final String successMessage = creatingItem ? "Item added"
                        : "Item updated";
                Notification
                        .show(successMessage, 3000,
                                Notification.Position.BOTTOM_END)
                        .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
            } catch (ValidationException e) {
                // Show validation error
                Notification.show("Invalid item", 3000,
                        Notification.Position.BOTTOM_END);
            }
        });
        // end::save-snippet[]

        // tag::layout[]
        FormLayout formLayout = new FormLayout();
        formLayout.setAutoResponsive(true);
        formLayout.addFormRow(productNameField, categoryField, saveButton);

        add(formLayout);
        // end::layout[]
    }

    static private List<Item> listItems() {
        return List.of(new Item(1, "Laptop", "Tech"),
                new Item(2, "Desk Chair", "Office"),
                new Item(3, "Monitor", "Tech"), new Item(4, "Keyboard", "Tech"),
                new Item(5, "Mouse Pad", "Office"),
                new Item(6, "Printer Paper", "Office"),
                new Item(7, "Stapler", "Office"),
                new Item(8, "Desk", "Stationary"),
                new Item(9, "Notebook", "Office"),
                new Item(10, "Pen Set", "Office"),
                new Item(11, "Cable Ties", "Tech"),
                new Item(12, "Extension Cord", "Tech"));
    }

    static private @NonNull Item saveItem(@NonNull Item item) {
        // Make the item change persistent, for example, using a database
        final Item savedItem = new Item();
        savedItem.setId(item.getId());
        savedItem.setProduct(item.getProduct());
        savedItem.setCategory(item.getCategory());
        return savedItem;
    }

    /**
     * Item bean class for storing supply information
     */
    // tag::data-model[]
    static public class Item {
        private long id;
        @NonNull
        private String product = "";
        @NonNull
        private String category = "";
        // end::data-model[]

        // Constructor
        public Item() {
        }

        // Parameterized constructor with all fields
        public Item(long id, @NonNull String product,
                @NonNull String category) {
            this.id = id;
            this.product = product;
            this.category = category;
        }

        // Getters and Setters
        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }

        public @NonNull String getProduct() {
            return product;
        }

        public void setProduct(@NonNull String product) {
            this.product = product;
        }

        public @NonNull String getCategory() {
            return category;
        }

        public void setCategory(@NonNull String category) {
            this.category = category;
        }

        @Override
        public String toString() {
            return String.format("Item[id=%d, product='%s', category='%s']", id,
                    product, category);
        }
        // tag::data-model[]
    }
    // end::data-model[]
}
