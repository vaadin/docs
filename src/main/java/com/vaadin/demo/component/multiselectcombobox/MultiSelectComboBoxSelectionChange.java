package com.vaadin.demo.component.multiselectcombobox;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Country;
import com.vaadin.demo.domain.DataService;
import com.vaadin.flow.component.combobox.MultiSelectComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.router.Route;

import java.util.List;
import java.util.stream.Collectors;

@Route("multi-select-combo-box-selection-change")
public class MultiSelectComboBoxSelectionChange extends Div {

    public MultiSelectComboBoxSelectionChange() {
        MultiSelectComboBox<Country> comboBox = new MultiSelectComboBox<>(
                "Countries");
        List<Country> countries = DataService.getCountries();
        comboBox.setItems(countries);
        comboBox.setItemLabelGenerator(Country::getName);

        // tag::snippet[]
        TextArea selectedCountries = new TextArea("Selected Countries");
        selectedCountries.setReadOnly(true);

        comboBox.addValueChangeListener(e -> {
            String selectedCountriesText = e.getValue().stream()
                    .map(Country::getName).collect(Collectors.joining(", "));

            selectedCountries.setValue(selectedCountriesText);
        });
        // end::snippet[]

        HorizontalLayout layout = new HorizontalLayout(comboBox,
                selectedCountries);
        add(layout);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<MultiSelectComboBoxSelectionChange> { // hidden-source-line
    } // hidden-source-line
}
