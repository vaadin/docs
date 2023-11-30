package com.vaadin.demo.component.multiselectcombobox;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Country;
import com.vaadin.demo.domain.DataService;
import com.vaadin.flow.component.combobox.MultiSelectComboBox;
import com.vaadin.flow.component.combobox.MultiSelectComboBox.AutoExpandMode;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("multi-select-combo-box-auto-expand")
public class MultiSelectComboBoxAutoExpand extends Div {

    public MultiSelectComboBoxAutoExpand() {
        MultiSelectComboBox<Country> comboBox = new MultiSelectComboBox<>(
                "Countries");
        List<Country> countries = DataService.getCountries();
        comboBox.setItems(countries);
        comboBox.setItemLabelGenerator(Country::getName);
        comboBox.select(countries.subList(0, 4));
        // tag::snippet[]
        comboBox.setAutoExpand(AutoExpandMode.BOTH);
        // end::snippet[]
        add(comboBox);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<MultiSelectComboBoxAutoExpand> { // hidden-source-line
    } // hidden-source-line
}
