package com.vaadin.demo.component.checkbox;

import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.checkbox.CheckboxGroup;
import com.vaadin.flow.component.checkbox.CheckboxGroupVariant;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

import java.util.HashSet;
import java.util.List;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;

@Route("checkbox-indeterminate")
public class CheckboxIndeterminate extends VerticalLayout {

    private List<Person> items = DataService.getPeople(3);

    public CheckboxIndeterminate() {
        setPadding(false);

        // tag::snippet[]
        Checkbox checkbox = new Checkbox("Notify users");

        CheckboxGroup<Person> checkboxGroup = new CheckboxGroup<>();
        checkboxGroup.setLabel("Users to notify");
        checkboxGroup.setItemLabelGenerator(person -> person.getFirstName() + " " + person.getLastName());
        checkboxGroup.setItems(items);
        checkboxGroup.addThemeVariants(CheckboxGroupVariant.LUMO_VERTICAL);
        checkboxGroup.addValueChangeListener(event -> {
            if (event.getValue().size() == items.size()) {
                checkbox.setValue(true);
                checkbox.setIndeterminate(false);
            } else if (event.getValue().size() == 0) {
                checkbox.setValue(false);
                checkbox.setIndeterminate(false);
            } else {
                checkbox.setIndeterminate(true);
            }
        });
        checkbox.addValueChangeListener(event -> {
            if (checkbox.getValue()) {
                checkboxGroup.setValue(new HashSet<>(items));
            } else {
                checkboxGroup.deselectAll();
            }
        });
        checkboxGroup.select(items.get(0), items.get(2));
        add(checkbox, checkboxGroup);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<CheckboxIndeterminate> { // hidden-source-line
    } // hidden-source-line
}
