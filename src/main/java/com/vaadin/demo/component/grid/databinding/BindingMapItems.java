package com.vaadin.demo.component.grid.databinding;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.dataview.GridListDataView;
import com.vaadin.flow.component.grid.editor.Editor;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.IntegerField;
import com.vaadin.flow.data.binder.Binder;

public class BindingMapItems extends VerticalLayout {
    public BindingMapItems() {
        List<String> months = List.of("Jan", "Feb", "Mar", "Apr");
        List<Map<String, Object>> rows = new ArrayList<>();
        for (String product : List.of("Laptops", "Phones", "Tablets")) {
            Map<String, Object> row = new HashMap<>();
            row.put("product", product);
            months.forEach(month -> row.put(month, 0));
            rows.add(row);
        }

        // tag::body[]
        Grid<Map<String, Object>> grid = new Grid<>();
        GridListDataView<Map<String, Object>> dataView = grid.setItems(rows);
        // Map equality depends on its content, so use a stable key as the
        // item identifier to keep editing and refreshing items working
        dataView.setIdentifierProvider(row -> row.get("product"));

        Binder<Map<String, Object>> binder = new Binder<>();
        Editor<Map<String, Object>> editor = grid.getEditor();
        editor.setBinder(binder);

        grid.addColumn(row -> row.get("product")).setHeader("Product");

        // Columns are generated from data that's only known at runtime
        for (String month : months) {
            IntegerField field = new IntegerField();
            field.setWidthFull();
            binder.forField(field).bind(row -> (Integer) row.get(month),
                    (row, value) -> row.put(month, value));
            grid.addColumn(row -> row.get(month)).setHeader(month)
                    .setEditorComponent(field);
        }

        grid.addItemDoubleClickListener(
                event -> editor.editItem(event.getItem()));
        // end::body[]

        add(grid);
    }
}
