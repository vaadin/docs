package com.vaadin.demo.component.combobox;

import java.util.Optional;
import java.util.stream.Stream;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Country;
import com.vaadin.demo.domain.DataService;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.combobox.dataview.ComboBoxLazyDataView;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("combo-box-focus-selected-item-lazy")
public class ComboBoxFocusSelectedItemLazy extends Div {

    public ComboBoxFocusSelectedItemLazy() {
        // tag::snippet[]
        ComboBox<Country> comboBox = new ComboBox<>("Country");
        comboBox.setItemLabelGenerator(Country::getName);

        ComboBoxLazyDataView<Country> dataView = comboBox.setItems(
                query -> filteredCountries(query.getFilter())
                        .skip(query.getOffset()).limit(query.getLimit()),
                query -> (int) filteredCountries(query.getFilter()).count());

        // Resolves the selected item's index against the current filter so
        // setFocusSelectedItem can scroll the overlay to it on open.
        dataView.setItemIndexProvider((item, query) -> {
            int index = filteredCountries(
                    query.getFilter().map(Object::toString)).toList()
                    .indexOf(item);
            return index >= 0 ? index : null;
        });

        comboBox.setFocusSelectedItem(true);
        // end::snippet[]
        DataService.getCountries().stream() // hidden-source-line
                .filter(c -> "United States".equals(c.getName())) // hidden-source-line
                .findFirst() // hidden-source-line
                .ifPresent(comboBox::setValue); // hidden-source-line
        add(comboBox);
    }

    private static Stream<Country> filteredCountries(Optional<String> filter) {
        return DataService.getCountries().stream().filter(country -> filter.map(
                f -> country.getName().toLowerCase().contains(f.toLowerCase()))
                .orElse(true));
    }

    public static class Exporter
            extends DemoExporter<ComboBoxFocusSelectedItemLazy> { // hidden-source-line
    } // hidden-source-line
}
