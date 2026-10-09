package com.vaadin.demo.component.multiselectcombobox;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Country;
import com.vaadin.demo.domain.DataService;
import com.vaadin.flow.component.combobox.MultiSelectComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("multi-select-combo-box-select-all")
public class MultiSelectComboBoxSelectAll extends Div {

    public MultiSelectComboBoxSelectAll() {
        // tag::snippet[]
        MultiSelectComboBox<Country> comboBox = new MultiSelectComboBox<>(
                "Countries");
        comboBox.setItems(DataService.getCountries());
        comboBox.setItemLabelGenerator(Country::getName);
        comboBox.setSelectAllButtonVisible(true);
        // end::snippet[]
        comboBox.setWidth("300px");
        add(comboBox);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<MultiSelectComboBoxSelectAll> { // hidden-source-line
    } // hidden-source-line
}
