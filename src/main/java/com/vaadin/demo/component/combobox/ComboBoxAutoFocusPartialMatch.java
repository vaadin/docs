package com.vaadin.demo.component.combobox;

import com.vaadin.flow.component.combobox.AutoFocusPartialMatch;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Country;
import com.vaadin.demo.domain.DataService;

@Route("combo-box-auto-focus-partial-match")
public class ComboBoxAutoFocusPartialMatch extends Div {

    public ComboBoxAutoFocusPartialMatch() {
        // tag::snippet[]
        ComboBox<Country> comboBox = new ComboBox<>("Country");
        comboBox.setAutoFocusPartialMatch(AutoFocusPartialMatch.FIRST_MATCH);
        add(comboBox);
        // end::snippet[]
        comboBox.setItems(DataService.getCountries());
        comboBox.setItemLabelGenerator(Country::getName);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<ComboBoxAutoFocusPartialMatch> { // hidden-source-line
    } // hidden-source-line
}
