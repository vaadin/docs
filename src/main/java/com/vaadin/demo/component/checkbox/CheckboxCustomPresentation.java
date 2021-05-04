package com.vaadin.demo.component.checkbox;

import com.vaadin.flow.component.checkbox.CheckboxGroup;
import com.vaadin.flow.component.checkbox.CheckboxGroupVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.util.List;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;

@Route("checkbox-custom-presentation")
public class CheckboxCustomPresentation extends Div {

    private List<Person> items = DataService.getPeople(4);

    public CheckboxCustomPresentation() {
        // tag::snippet[]
        CheckboxGroup<Person> checkboxGroup = new CheckboxGroup<>();
        checkboxGroup.setLabel("Invitees");
        checkboxGroup.setItemLabelGenerator(person -> person.getFirstName() + " " + person.getLastName());
        checkboxGroup.setItems(items);
        checkboxGroup.addThemeVariants(CheckboxGroupVariant.LUMO_VERTICAL);
        add(checkboxGroup);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<CheckboxCustomPresentation> { // hidden-source-line
    } // hidden-source-line
}
