package com.vaadin.demo.component.multiselectcombobox;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Country;
import com.vaadin.demo.domain.DataService;
import com.vaadin.flow.component.combobox.MultiSelectComboBox;
import com.vaadin.flow.component.combobox.MultiSelectComboBoxI18n;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("multi-select-combo-box-i18n")
public class MultiSelectComboBoxI18nDemo extends Div {

    public MultiSelectComboBoxI18nDemo() {
        MultiSelectComboBox<Country> comboBox = new MultiSelectComboBox<>(
                "Länder");
        comboBox.setItems(DataService.getCountries());
        comboBox.setItemLabelGenerator(Country::getName);
        comboBox.setWidth("300px");
        add(comboBox);

        // tag::snippet[]
        MultiSelectComboBoxI18n i18n = new MultiSelectComboBoxI18n();
        i18n.setCleared("Alle Einträge entfernt");
        i18n.setFocused(" ausgewählt. Drücke Rücktaste zum Entfernen");
        i18n.setSelected(" hinzugefügt");
        i18n.setDeselected(" entfernt");
        i18n.setTotal("{count} Einträge ausgewählt");

        comboBox.setI18n(i18n);
        // end::snippet[]
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<MultiSelectComboBoxI18nDemo> { // hidden-source-line
    } // hidden-source-line
}
