package com.vaadin.demo.component.combobox;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Country;
import com.vaadin.demo.domain.DataService;

@Route("combo-box-partial-match-mode")
public class ComboBoxPartialMatchMode extends Div {

    public ComboBoxPartialMatchMode() {
        // tag::snippet[]
        ComboBox<Country> comboBox = new ComboBox<>("Country");
        comboBox.getElement().setProperty("partialMatchMode", "first-match");
        add(comboBox);
        // end::snippet[]
        comboBox.setItems(DataService.getCountries());
        comboBox.setItemLabelGenerator(Country::getName);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<ComboBoxPartialMatchMode> { // hidden-source-line
    } // hidden-source-line
}
