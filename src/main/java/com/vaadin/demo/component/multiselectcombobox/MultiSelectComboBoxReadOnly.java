package com.vaadin.demo.component.multiselectcombobox;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Country;
import com.vaadin.demo.domain.DataService;
import com.vaadin.flow.component.combobox.MultiSelectComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("multi-select-combo-box-read-only")
public class MultiSelectComboBoxReadOnly extends Div {

    public MultiSelectComboBoxReadOnly() {
        MultiSelectComboBox<Country> comboBox = new MultiSelectComboBox<>(
                "Countries");
        List<Country> countries = DataService.getCountries();
        comboBox.setItems(countries);
        comboBox.select(countries.subList(0, 4));
        comboBox.setItemLabelGenerator(Country::getName);
        // tag::snippet[]
        comboBox.setReadOnly(true);
        // end::snippet[]
        comboBox.setWidth("300px");
        add(comboBox);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<MultiSelectComboBoxReadOnly> { // hidden-source-line
    } // hidden-source-line
}
