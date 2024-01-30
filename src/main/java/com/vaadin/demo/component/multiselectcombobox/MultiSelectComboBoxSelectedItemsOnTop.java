package com.vaadin.demo.component.multiselectcombobox;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Country;
import com.vaadin.demo.domain.DataService;
import com.vaadin.flow.component.combobox.MultiSelectComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("multi-select-combo-box-selected-items-on-top")
public class MultiSelectComboBoxSelectedItemsOnTop extends Div {

    public MultiSelectComboBoxSelectedItemsOnTop() {
        MultiSelectComboBox<Country> comboBox = new MultiSelectComboBox<>(
                "Countries");
        List<Country> countries = DataService.getCountries();
        comboBox.setItems(countries);
        comboBox.setItemLabelGenerator(Country::getName);
        comboBox.select(countries.subList(20, 23));
        // tag::snippet[]
        comboBox.setSelectedItemsOnTop(true);
        // end::snippet[]
        add(comboBox);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<MultiSelectComboBoxSelectedItemsOnTop> { // hidden-source-line
    } // hidden-source-line
}
