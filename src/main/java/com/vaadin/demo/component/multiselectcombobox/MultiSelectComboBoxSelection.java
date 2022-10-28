package com.vaadin.demo.component.multiselectcombobox;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Country;
import com.vaadin.demo.domain.DataService;
import com.vaadin.flow.component.combobox.MultiSelectComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("multi-select-combo-box-selection")
public class MultiSelectComboBoxSelection extends Div {

    public MultiSelectComboBoxSelection() {
        MultiSelectComboBox<Country> comboBox = new MultiSelectComboBox<>(
                "Countries");
        List<Country> countries = DataService.getCountries();
        comboBox.setItems(countries);
        // tag::snippet[]
        comboBox.select(countries.subList(0, 4));
        // end::snippet[]
        comboBox.setItemLabelGenerator(Country::getName);
        comboBox.setWidth("300px");
        add(comboBox);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<MultiSelectComboBoxSelection> { // hidden-source-line
    } // hidden-source-line
}
