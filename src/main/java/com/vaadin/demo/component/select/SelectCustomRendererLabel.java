package com.vaadin.demo.component.select;

import com.vaadin.demo.DemoExporter;
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.data.renderer.ComponentRenderer;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("select-custom-renderer-label")
public class SelectCustomRendererLabel extends Div {

  public SelectCustomRendererLabel() {
    // tag::snippet[]
    Select<Person> select = new Select<>();
    select.setLabel("Assignee");
    // Use a custom renderer for items in the dropdown
    select.setRenderer(SelectCustomRendererLabel.createPersonRenderer());
    // Display full name of the person as selected value label
    select.setItemLabelGenerator(Person::getFullName);

    List<Person> people = DataService.getPeople(5);
    select.setItems(people);
    // end::snippet[]

    add(select);
  }

  private static ComponentRenderer<FlexLayout, Person> createPersonRenderer() {
    return new ComponentRenderer<>(person -> {
      FlexLayout wrapper = new FlexLayout();
      wrapper.setAlignItems(FlexComponent.Alignment.CENTER);

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
    });
  }

  public static class Exporter extends DemoExporter<SelectCustomRendererLabel> { // hidden-source-line
  } // hidden-source-line
}
