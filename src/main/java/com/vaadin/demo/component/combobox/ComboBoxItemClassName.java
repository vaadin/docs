package com.vaadin.demo.component.combobox;

import java.util.List;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Country;
import com.vaadin.demo.domain.DataService;

@Route("combo-box-item-class-name")
public class ComboBoxItemClassName extends Div {

    public ComboBoxItemClassName() {
        // tag::snippet[]
        ComboBox<Country> comboBox = new ComboBox<>("Country");
        List<Country> countries = DataService.getCountries();
        comboBox.setItems(countries);
        comboBox.setClassNameGenerator((item) -> {
            int index = countries.indexOf(item);
            return index % 2 == 0 ? "even" : "odd";
        });
        // end::snippet[]
        comboBox.setItemLabelGenerator(Country::getName);
        add(comboBox);
    }

    public static class Exporter extends DemoExporter<ComboBoxItemClassName> { // hidden-source-line
    } // hidden-source-line
}
