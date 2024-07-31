package com.vaadin.demo.component.multiselectcombobox;

import java.util.List;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Country;
import com.vaadin.demo.domain.DataService;
import com.vaadin.flow.component.combobox.MultiSelectComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("multi-select-combo-box-item-class-name")
public class MultiSelectComboBoxItemClassName extends Div {

    public MultiSelectComboBoxItemClassName() {
        // tag::snippet[]
        MultiSelectComboBox<Country> comboBox = new MultiSelectComboBox<>(
                "Countries");
        List<Country> countries = DataService.getCountries();
        comboBox.setItems(countries);
        comboBox.setClassNameGenerator((item) -> {
            int index = countries.indexOf(item);
            return index % 2 == 0 ? "even" : "odd";
        });
        // end::snippet[]
        comboBox.setItemLabelGenerator(Country::getName);
        comboBox.select(countries.subList(0, 3));
        add(comboBox);
        comboBox.setWidth("300px");
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<MultiSelectComboBoxItemClassName> { // hidden-source-line
    } // hidden-source-line
}
