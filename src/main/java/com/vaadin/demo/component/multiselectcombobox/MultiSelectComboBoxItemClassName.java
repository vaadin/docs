package com.vaadin.demo.component.multiselectcombobox;

import java.util.List;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.combobox.MultiSelectComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("multi-select-combo-box-item-class-name")
public class MultiSelectComboBoxItemClassName extends Div {

    public MultiSelectComboBoxItemClassName() {
        // tag::snippet[]
        MultiSelectComboBox<String> comboBox = new MultiSelectComboBox<>(
                "Fruit");
        List<String> items = List.of("Apple", "Banana", "Orange", "Pear");
        comboBox.setItems(items);
        comboBox.setClassNameGenerator((item) -> {
            switch (item) {
            case "Apple":
                return "coral";
            case "Banana":
                return "gold";
            case "Orange":
                return "orange";
            case "Pear":
                return "yellowgreen";
            default:
                return "";
            }
        });
        // end::snippet[]
        comboBox.select(items.subList(0, 2));
        comboBox.setWidth("300px");
        add(comboBox);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<MultiSelectComboBoxItemClassName> { // hidden-source-line
    } // hidden-source-line
}
