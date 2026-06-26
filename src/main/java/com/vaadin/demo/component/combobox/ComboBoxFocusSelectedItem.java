package com.vaadin.demo.component.combobox;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Country;
import com.vaadin.demo.domain.DataService;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("combo-box-focus-selected-item")
public class ComboBoxFocusSelectedItem extends Div {

    public ComboBoxFocusSelectedItem() {
        // tag::snippet[]
        ComboBox<Country> comboBox = new ComboBox<>("Country");
        comboBox.setItems(DataService.getCountries());
        comboBox.setItemLabelGenerator(Country::getName);
        comboBox.setFocusSelectedItem(true);
        // end::snippet[]
        DataService.getCountries().stream() // hidden-source-line
                .filter(c -> "United States".equals(c.getName())) // hidden-source-line
                .findFirst() // hidden-source-line
                .ifPresent(comboBox::setValue); // hidden-source-line
        add(comboBox);
    }

    public static class Exporter
            extends DemoExporter<ComboBoxFocusSelectedItem> { // hidden-source-line
    } // hidden-source-line
}
