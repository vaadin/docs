package com.vaadin.demo.component.combobox;

import java.util.List;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("combo-box-item-class-name")
public class ComboBoxItemClassName extends Div {

    public ComboBoxItemClassName() {
        // tag::snippet[]
        ComboBox<String> comboBox = new ComboBox<>("Fruit");
        comboBox.setItems(List.of("Apple", "Banana", "Orange", "Pear"));
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
        add(comboBox);
    }

    public static class Exporter extends DemoExporter<ComboBoxItemClassName> { // hidden-source-line
    } // hidden-source-line
}
