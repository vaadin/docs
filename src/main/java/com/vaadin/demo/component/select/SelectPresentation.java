package com.vaadin.demo.component.select;

import java.util.List;

import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.data.renderer.ComponentRenderer;
import com.vaadin.flow.router.Route;

@Route("select-presentation")
public class SelectPresentation extends Div {

    public SelectPresentation() {

        // Have some data
        List<Person> doctors = DataService.getPeople(4);

        // tag::snippet[]
        // Create a Select component with some data
        Select<Person> select = new Select<>();
        select.setLabel("Choose doctor");
        select.setItems(doctors);

        select.setRenderer(new ComponentRenderer<>(person -> {
            FlexLayout wrapper = new FlexLayout();

            // NOTE
            // We are using inline styles here to keep the example simple.
            // We recommend placing CSS in a separate style sheet and to
            // encapsulating the styling in a new component.

            Image image = new Image();
            image.setSrc(person.getPictureUrl());
            image.setAlt("Portrait of " + person.getFirstName() + " " + person.getLastName());
            image.setWidth("var(--lumo-size-m)");
            image.getStyle().set("margin-right", "var(--lumo-space-s)");

            Div info = new Div();
            info.setText(person.getFirstName() + " " + person.getLastName());

            Div profession = new Div();
            profession.setText(person.getProfession());
            profession.getStyle().set("font-size", "var(--lumo-font-size-s)");
            profession.getStyle().set("color", "var(--lumo-secondary-text-color)");
            info.add(profession);

            wrapper.add(image, info);
            return wrapper;
        }));

        add(select);
        // end::snippet[]
    }

    public static class SelectPresentationExporter extends DemoExporter<SelectPresentation> { // hidden-full-source-line
    } // hidden-full-source-line
}
