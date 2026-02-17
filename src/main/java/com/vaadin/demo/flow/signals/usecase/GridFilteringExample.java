package com.vaadin.demo.flow.signals.usecase;

import com.vaadin.flow.component.ComponentEffect;
import java.util.List;

import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.signals.Signal;
import com.vaadin.flow.signals.local.ValueSignal;
import java.util.Objects;

public class GridFilteringExample extends VerticalLayout {

    // tag::snippet[]
    public GridFilteringExample() {
        // Create signals for filter inputs
        ValueSignal<String> categoryFilterSignal = new ValueSignal<>("All");
        ValueSignal<String> searchTermSignal = new ValueSignal<>("");
        ValueSignal<Boolean> inStockOnlySignal = new ValueSignal<>(false);

        // Load all products
        List<Product> allProducts = loadProducts();

        // Computed signal for filtered products
        Signal<List<Product>> filteredProductsSignal = Signal.computed(() -> {
            String category = categoryFilterSignal.get();
            String searchTerm = searchTermSignal.get().toLowerCase();
            boolean inStockOnly = inStockOnlySignal.get();

            return allProducts.stream()
                .filter(p -> category.equals("All")
                    || p.category().equals(category))
                .filter(p -> searchTerm.isEmpty()
                    || p.name().toLowerCase().contains(searchTerm)
                    || p.id().toLowerCase().contains(searchTerm))
                .filter(p -> !inStockOnly || p.stock() > 0)
                .toList();
        });

        // Filter UI components
        ComboBox<String> categoryFilter = new ComboBox<>("Category", List.of(
                "All", "Electronics", "Clothing", "Books", "Home & Garden"));
        categoryFilter.bindValue(categoryFilterSignal, categoryFilterSignal::set);

        TextField searchField = new TextField("Search");
        searchField.setPlaceholder("Search by name or ID");
        searchField.bindValue(searchTermSignal, searchTermSignal::set);

        Checkbox inStockCheckbox = new Checkbox("Show in-stock items only");
        inStockCheckbox.bindValue(inStockOnlySignal, inStockOnlySignal::set);

        // Data grid
        Grid<Product> productGrid = new Grid<>(Product.class);
        productGrid.setColumns("id", "name", "category", "price", "stock");
        ComponentEffect.effect(productGrid, () -> {
            productGrid.setItems(Objects.requireNonNullElseGet(
                filteredProductsSignal.get(), List::of));
        });

        add(categoryFilter, searchField, inStockCheckbox, productGrid);
    }
    // end::snippet[]

    private List<Product> loadProducts() {
        // Returns sample product data
        return List.of(
                new Product("P001", "Laptop", "Electronics", 999.99, 15),
                new Product("P002", "T-Shirt", "Clothing", 19.99, 50),
                new Product("P003", "Java Programming Book", "Books", 49.99, 0),
                new Product("P004", "Garden Hose", "Home & Garden", 29.99, 30),
                new Product("P005", "Wireless Mouse", "Electronics", 25.99, 0),
                new Product("P006", "Jeans", "Clothing", 59.99, 20),
                new Product("P007", "Fiction Novel", "Books", 14.99, 100),
                new Product("P008", "Plant Pot", "Home & Garden", 12.99, 45),
                new Product("P009", "Keyboard", "Electronics", 79.99, 8),
                new Product("P010", "Winter Jacket", "Clothing", 129.99, 5));
    }

    // Product data model
    public record Product(String id, String name, String category, double price,
            int stock) {
    }
}
