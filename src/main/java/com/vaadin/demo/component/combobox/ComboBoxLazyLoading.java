package com.vaadin.demo.component.combobox;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Country;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("combo-box-lazy-loading")
// tag::snippet[]
public class ComboBoxLazyLoading extends Div {
    public ComboBoxLazyLoading(ComboBoxCountryService countryService) {
        ComboBox<Country> comboBox = new ComboBox<>("Country");
        comboBox.setItemLabelGenerator(Country::getName);
        // Connect the combo box to a Spring service that fetches data based
        // on a Spring Data pageable and the current combo box filter
        comboBox.setItemsPageable(countryService::list);
        add(comboBox);
    }

    public static class Exporter extends DemoExporter<ComboBoxLazyLoading> { // hidden-source-line
    } // hidden-source-line
}
// end::snippet[]
