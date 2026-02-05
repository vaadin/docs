package com.vaadin.demo.buildingapps.uistatemanagement;

import com.vaadin.flow.component.ComponentEffect;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.signals.Signal;
import com.vaadin.signals.WritableSignal;
import com.vaadin.signals.local.ValueSignal;

import java.util.List;

@Route("reactive-grid")
public class ReactiveGridView extends VerticalLayout {

    public ReactiveGridView() {
        // tag::signals[]
        // Writable signals for the filter inputs
        WritableSignal<String> categorySignal = new ValueSignal<>("All");
        WritableSignal<String> searchSignal = new ValueSignal<>("");
        WritableSignal<Boolean> inStockSignal = new ValueSignal<>(false);

        List<Product> allProducts = loadProducts();

        // A computed signal that automatically updates whenever any of the filter signals change
        Signal<List<Product>> filteredProducts = Signal.computed(() -> {
            String category = categorySignal.value();
            String search = searchSignal.value().toLowerCase();
            boolean inStock = inStockSignal.value();

            return allProducts.stream()
                    .filter(p -> category.equals("All") || p.category().equals(category))
                    .filter(p -> search.isEmpty() || p.name().toLowerCase().contains(search))
                    .filter(p -> !inStock || p.stock() > 0)
                    .toList();
        });
        // end::signals[]

        // tag::inputs[]
        ComboBox<String> categoryFilter = new ComboBox<>("Category",
                List.of("All", "Electronics", "Clothing", "Books"));
        categoryFilter.bindValue(categorySignal);

        TextField searchField = new TextField("Search by name");
        searchField.bindValue(searchSignal);

        Checkbox inStockCheckbox = new Checkbox("Show in-stock only");
        inStockCheckbox.bindValue(inStockSignal);
        // end::inputs[]

        // tag::grid[]
        Grid<Product> grid = new Grid<>(Product.class);
        grid.setColumns("name", "category", "price", "stock");

        // Bind the computed signal to the grid's items
        ComponentEffect.bind(grid, filteredProducts, Grid::setItems);
        // end::grid[]

        add(categoryFilter, searchField, inStockCheckbox, grid);
    }

    private List<Product> loadProducts() {
        return List.of(
            new Product("1", "Laptop", "Electronics", 999.0, 10),
            new Product("2", "T-Shirt", "Clothing", 20.0, 50),
            new Product("3", "Java Book", "Books", 45.0, 0),
            new Product("4", "Phone", "Electronics", 500.0, 5)
        );
    }
}
