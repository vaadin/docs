package com.vaadin.demo.component.multiselectcombobox;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Country;
import com.vaadin.demo.domain.DataService;
import com.vaadin.flow.component.combobox.MultiSelectComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("multi-select-combo-box-basic")
public class MultiSelectComboBoxBasic extends Div {

    public MultiSelectComboBoxBasic() {
        // tag::snippet[]
        MultiSelectComboBox<Country> comboBox = new MultiSelectComboBox<>(
                "Countries");
        comboBox.setItems(DataService.getCountries());
        comboBox.setItemLabelGenerator(Country::getName);
        add(comboBox);
        // end::snippet[]
        comboBox.setWidth("300px");
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<MultiSelectComboBoxBasic> { // hidden-source-line
    } // hidden-source-line
}
