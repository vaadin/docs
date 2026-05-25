package com.vaadin.demo.component.combobox;

import java.util.List;
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
                query -> filteredCountries(query.getFilter().orElse(""))
                        .skip(query.getOffset()).limit(query.getLimit()),
                query -> (int) filteredCountries(query.getFilter().orElse(""))
                        .count());

        dataView.setItemIndexProvider((item, query) -> {
            String filter = query.getFilter().map(Object::toString).orElse("");
            int index = filteredCountries(filter).toList().indexOf(item);
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

    private static Stream<Country> filteredCountries(String filter) {
        List<Country> countries = DataService.getCountries();
        if (filter == null || filter.isEmpty()) {
            return countries.stream();
        }
        String normalized = filter.toLowerCase();
        return countries.stream().filter(country -> country.getName()
                .toLowerCase().contains(normalized));
    }

    public static class Exporter extends DemoExporter<ComboBoxFocusSelectedItemLazy> { // hidden-source-line
    } // hidden-source-line
}
