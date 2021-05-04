package com.vaadin.demo.component.select;

import com.vaadin.demo.DemoExporter;
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.FlexComponent.Alignment;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.data.renderer.ComponentRenderer;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("select-presentation")
public class SelectPresentation extends Div {

  private List<Person> items = DataService.getPeople(5);

  public SelectPresentation() {
    // tag::snippet[]
    Select<Person> select = new Select<>();
    select.setLabel("Choose doctor");
    select.setRenderer(new ComponentRenderer<>(person -> {
        FlexLayout wrapper = new FlexLayout();
        wrapper.setAlignItems(Alignment.CENTER);

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
    select.setItems(items);
    add(select);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<SelectPresentation> { // hidden-source-line
  } // hidden-source-line
}
