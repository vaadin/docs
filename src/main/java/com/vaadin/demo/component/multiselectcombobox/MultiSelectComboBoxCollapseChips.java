package com.vaadin.demo.component.multiselectcombobox;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Country;
import com.vaadin.demo.domain.DataService;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.combobox.MultiSelectComboBox;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("multi-select-combo-box-collapse-chips")
public class MultiSelectComboBoxCollapseChips extends VerticalLayout {

    public MultiSelectComboBoxCollapseChips() {
        MultiSelectComboBox<Country> comboBox = new MultiSelectComboBox<>(
                "Countries");
        List<Country> countries = DataService.getCountries();
        comboBox.setItems(countries);
        comboBox.setItemLabelGenerator(Country::getName);
        comboBox.select(countries.subList(0, 3));
        comboBox.setWidth("250px");
        // tag::snippet[]
        comboBox.setCollapseChips(true);

        Checkbox toggle = new Checkbox("Collapse chips", true);
        toggle.addValueChangeListener(
                e -> comboBox.setCollapseChips(e.getValue()));
        // end::snippet[]

        setPadding(false);
        add(comboBox, toggle);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<MultiSelectComboBoxCollapseChips> { // hidden-source-line
    } // hidden-source-line
}
